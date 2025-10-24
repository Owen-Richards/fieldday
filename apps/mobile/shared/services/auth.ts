const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email?: string;
  phone?: string;
  username: string;
  roles: string[];
  profile: any;
}

// Mock secure storage for now (use expo-secure-store in actual implementation)
const SecureStore = {
  async setItemAsync(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  async getItemAsync(key: string): Promise<string | null> {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  async deleteItemAsync(key: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};

class AuthService {
  private accessToken: string | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  private actAs: 'player' | 'parent' | 'organizer' = 'player';

  async init(): Promise<User | null> {
    try {
      const tokens = await this.getStoredTokens();
      if (!tokens) return null;

      this.accessToken = tokens.accessToken;
      this.scheduleRefresh();

      return await this.getCurrentUser();
    } catch (error) {
      console.error('Auth init failed:', error);
      return null;
    }
  }

  async requestOtp(phoneOrEmail: string): Promise<void> {
    const isPhone = !phoneOrEmail.includes('@');
    const body = isPhone ? { phone: phoneOrEmail } : { email: phoneOrEmail };

    const response = await fetch(`${API_BASE}/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send OTP');
    }
  }

  async verifyOtp(phoneOrEmail: string, code: string): Promise<User> {
    const isPhone = !phoneOrEmail.includes('@');
    const body = isPhone
      ? { phone: phoneOrEmail, code, deviceInfo: { platform: 'mobile' } }
      : { email: phoneOrEmail, code, deviceInfo: { platform: 'mobile' } };

    const response = await fetch(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify OTP');
    }

    const result = await response.json();
    const { accessToken, refreshToken, user } = result.data;

    // Store tokens
    await this.storeTokens({ accessToken, refreshToken });
    this.accessToken = accessToken;
    this.scheduleRefresh();

    return user;
  }

  async refreshToken(): Promise<void> {
    const tokens = await this.getStoredTokens();
    if (!tokens) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const result = await response.json();
    const { accessToken, refreshToken } = result.data;

    await this.storeTokens({
      accessToken,
      refreshToken: refreshToken || tokens.refreshToken,
    });
    this.accessToken = accessToken;
    this.scheduleRefresh();
  }

  async logout(): Promise<void> {
    const tokens = await this.getStoredTokens();

    if (tokens) {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
    }

    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    this.accessToken = null;

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.authenticatedFetch(`${API_BASE}/auth/me`);
    const result = await response.json();
    return result.data.user;
  }

  setActAs(role: 'player' | 'parent' | 'organizer'): void {
    this.actAs = role;
  }

  getActAs(): 'player' | 'parent' | 'organizer' {
    return this.actAs;
  }

  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      await this.refreshToken();
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${this.accessToken}`);
    headers.set('X-Act-As', this.actAs);

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Retry with refresh if token expired
    if (response.status === 403 || response.status === 401) {
      try {
        await this.refreshToken();
        headers.set('Authorization', `Bearer ${this.accessToken}`);
        response = await fetch(url, {
          ...options,
          headers,
        });
      } catch (error) {
        // Refresh failed, logout
        await this.logout();
        throw error;
      }
    }

    return response;
  }

  private async storeTokens(tokens: AuthTokens): Promise<void> {
    await SecureStore.setItemAsync('accessToken', tokens.accessToken);
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
  }

  private async getStoredTokens(): Promise<AuthTokens | null> {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  }

  private scheduleRefresh(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    // Refresh 1 minute before expiry (14 minutes)
    this.refreshTimer = setTimeout(
      () => {
        this.refreshToken().catch(console.error);
      },
      14 * 60 * 1000
    );
  }
}

export const authService = new AuthService();
