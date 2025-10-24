const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface AuthPayload {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email?: string;
    phone?: string;
    roles: string[];
    profile: any;
  };
}

class AuthApi {
  private accessToken: string | null = null;

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

  async verifyOtp(phoneOrEmail: string, code: string): Promise<AuthPayload> {
    const isPhone = !phoneOrEmail.includes('@');
    const body = isPhone ? { phone: phoneOrEmail, code } : { email: phoneOrEmail, code };

    const response = await fetch(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify OTP');
    }

    const result = await response.json();
    this.accessToken = result.data.accessToken;
    return result.data;
  }

  async requestMagicLink(email: string, redirectUrl?: string): Promise<void> {
    const response = await fetch(`${API_BASE}/auth/magic/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, redirectUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send magic link');
    }
  }

  async refreshToken(): Promise<string> {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const result = await response.json();
    this.accessToken = result.data.accessToken;
    return result.data.accessToken;
  }

  async logout(): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    this.accessToken = null;
  }

  async getCurrentUser(): Promise<any> {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get user');
    }

    const result = await response.json();
    return result.data.user;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }
}

export const authApi = new AuthApi();
