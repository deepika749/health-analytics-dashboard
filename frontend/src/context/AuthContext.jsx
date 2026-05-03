import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import config from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = config.API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const data = response.data;
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    const data = response.data;
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (profileData) => {
    // This is a placeholder for actual profile update logic
    // For now, we just update the local state
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
