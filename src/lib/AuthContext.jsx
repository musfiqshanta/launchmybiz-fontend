import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from './apiClient';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore invalid json
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser);
    try {
      if (nextUser) {
        localStorage.setItem('user', JSON.stringify(nextUser));
      } else {
        localStorage.removeItem('user');
      }
    } catch {}
  }, []);

  const persistToken = useCallback((nextToken) => {
    setToken(nextToken);
    try {
      if (nextToken) {
        localStorage.setItem('token', nextToken);
      } else {
        localStorage.removeItem('token');
      }
    } catch {}
  }, []);

  const login = useCallback(async (credentials) => {
    // Prefer using existing login endpoint; do not rely on baseURL in case it's different
    try {
      const response = await api.post('http://localhost:5001/api/customers/signin', credentials);
      const data = response?.data || {};
      const nextToken = data?.token || data?.accessToken;
      persistToken(nextToken || null);

      // Try to extract user data from response using common keys
      const nextUser = data?.user || data?.customer || null;
      if (nextUser) {
        persistUser(nextUser);
      } else {
        // Fallback minimal user shape for UI until profile fetch is implemented
        persistUser({ email: credentials?.email });
      }

      return { success: Boolean(nextToken), data };
    } catch (error) {
      return { success: false, error };
    }
  }, [persistToken, persistUser]);

  const logout = useCallback(() => {
    persistToken(null);
    persistUser(null);
    setUser(null);
  }, [persistToken, persistUser]);

  const value = useMemo(
    () => ({ user, token, loading, login, logout, setUser: persistUser }),
    [user, token, loading, login, logout, persistUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


