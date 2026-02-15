import { AuthUser, LoginCredentials, SignupCredentials } from '@/src/types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const auth = {
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `token=${token}; path=/; max-age=86400`;
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  setUser: (user: AuthUser): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): AuthUser | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  clearAuth: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken() && !!auth.getUser();
  },

  login: async (credentials: LoginCredentials): Promise<AuthUser> => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          const user: AuthUser = {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0],
            token: 'fake-jwt-token-' + Math.random().toString(36).substr(2),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  signup: async (credentials: SignupCredentials): Promise<AuthUser> => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password && credentials.fullName) {
          const user: AuthUser = {
            id: '1',
            email: credentials.email,
            name: credentials.fullName,
            token: 'fake-jwt-token-' + Math.random().toString(36).substr(2),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout: (): void => {
    auth.clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
};