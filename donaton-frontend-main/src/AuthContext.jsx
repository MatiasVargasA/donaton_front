/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('donaton_user');
    const token = localStorage.getItem('donaton_token');
    if (savedUser && token) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Error parsing saved user", e);
        localStorage.removeItem('donaton_user');
        localStorage.removeItem('donaton_token');
      }
    }
    return null;
  });
  const [loading] = useState(false);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('donaton_token', token);
    localStorage.setItem('donaton_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('donaton_token');
    localStorage.removeItem('donaton_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}