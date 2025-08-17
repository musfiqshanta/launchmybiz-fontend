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

  // Define persist functions first to avoid circular dependency
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

  // Set up real-time token monitoring
  useEffect(() => {
    if (loading) return; // Don't set up monitoring until initial load is complete

    const checkToken = () => {
      const currentToken = localStorage.getItem('token');
      if (!currentToken && token) {
        // Token was removed from localStorage, logout
      
        persistToken(null);
        persistUser(null);
      } else if (currentToken && !token) {
        // Token was added to localStorage, update state
        setToken(currentToken);
      }
    };

    // Check token on storage events (when localStorage changes in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        checkToken();
      }
    };

    // Check token periodically (every 5 seconds)
    const intervalId = setInterval(checkToken, 5000);

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token, loading, persistToken, persistUser]);

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
  }, [persistToken, persistUser]);

  // Validate token with server
  const validateToken = useCallback(async () => {
    if (!token) return false;
    
    try {
      const response = await api.get('/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.status === 200;
    } catch (error) {
     
      return false;
    }
  }, [token]);

  const value = useMemo(
    () => ({ user, token, loading, login, logout, setUser: persistUser, validateToken }),
    [user, token, loading, login, logout, persistUser, validateToken]
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


