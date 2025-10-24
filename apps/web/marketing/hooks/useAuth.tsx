import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, AuthPayload } from '../lib/api/auth';

interface User {
  id: string;
  email?: string;
  phone?: string;
  username: string;
  roles: string[];
  profile: any;
  reliability?: any;
  actAs?: 'player' | 'parent' | 'organizer';
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  actAs: 'player' | 'parent' | 'organizer' | null;
  setActAs: (role: 'player' | 'parent' | 'organizer') => void;
  requestOtp: (phoneOrEmail: string) => Promise<void>;
  verifyOtp: (phoneOrEmail: string, code: string) => Promise<void>;
  requestMagicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actAs, setActAs] = useState<'player' | 'parent' | 'organizer' | null>(null);

  // Auto-refresh token
  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;

    const scheduleRefresh = () => {
      // Refresh 1 minute before expiry (14 minutes)
      refreshTimer = setTimeout(() => {
        refresh();
      }, 14 * 60 * 1000);
    };

    const refresh = async () => {
      try {
        await authApi.refreshToken();
        scheduleRefresh();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        setUser(null);
      }
    };

    // Initial load
    const init = async () => {
      try {
        // Try to get stored token
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
          authApi.setAccessToken(storedToken);
        }

        await refresh();
        const user = await authApi.getCurrentUser();
        setUser(user);
        
        // Set default actAs based on roles
        if (user.roles.includes('organizer')) {
          setActAs('organizer');
        } else if (user.roles.includes('parent')) {
          setActAs('parent');
        } else {
          setActAs('player');
        }
      } catch (error) {
        console.error('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, []);

  const requestOtp = useCallback(async (phoneOrEmail: string) => {
    await authApi.requestOtp(phoneOrEmail);
  }, []);

  const verifyOtp = useCallback(async (phoneOrEmail: string, code: string) => {
    const payload = await authApi.verifyOtp(phoneOrEmail, code);
    localStorage.setItem('accessToken', payload.accessToken);
    
    const user = await authApi.getCurrentUser();
    setUser(user);
    
    // Set default actAs
    if (user.roles.includes('organizer')) {
      setActAs('organizer');
    } else if (user.roles.includes('parent')) {
      setActAs('parent');
    } else {
      setActAs('player');
    }
  }, []);

  const requestMagicLink = useCallback(async (email: string) => {
    await authApi.requestMagicLink(email, window.location.origin);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
    setActAs(null);
  }, []);

  const refresh = useCallback(async () => {
    const accessToken = await authApi.refreshToken();
    localStorage.setItem('accessToken', accessToken);
    const user = await authApi.getCurrentUser();
    setUser(user);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    actAs,
    setActAs,
    requestOtp,
    verifyOtp,
    requestMagicLink,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
