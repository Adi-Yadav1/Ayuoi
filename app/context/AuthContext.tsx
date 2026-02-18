/**
 * Auth Context - manages authentication state and user session
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/app/services/apiClient';
import { User } from '@/app/types/schema';

// Simple storage implementation using a cache (replace with AsyncStorage when package is available)
const storage = new Map<string, string>();
const AsyncStorage = {
  getItem: (key: string) => Promise.resolve(storage.get(key) || null),
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isSignout: boolean;
  isSignup: boolean;
  
  // Methods
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  restoreToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  REFRESH_TOKEN: 'refresh_token',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignout, setIsSignout] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // Restore token on app launch
  const restoreToken = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);

      if (storedToken) {
        setToken(storedToken);
        apiClient.setAuthToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to restore token', error);
    } finally {
      setIsLoading(false);
      setIsSignout(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await apiClient.login(email, password);
      
      // Check if response has user and token
      if (!response?.token || !response?.user) {
        throw new Error('Invalid response from server. Please try again.');
      }
      
      // Store token and user
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      // Update state
      setToken(response.token);
      setUser(response.user);
      apiClient.setAuthToken(response.token);
      setIsSignout(false);
      
    } catch (error) {
      console.error('Sign in failed', error);
      // Re-throw with proper error message
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed. Please check your email and password and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      setIsSignup(true);
      const response = await apiClient.signup(email, username, password);
      
      if (response?.token && response?.user) {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
        apiClient.setAuthToken(response.token);
        setIsSignout(false);
      }
      
    } catch (error) {
      console.error('Sign up failed', error);
      throw error;
    } finally {
      setIsLoading(false);
      setIsSignup(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsSignout(true);
      
      // Clear storage
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      
      // Update state
      setToken(null);
      setUser(null);
      apiClient.clearAuthToken();
      
    } catch (error) {
      console.error('Sign out failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser = { ...user, ...updates };
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isSignout,
    isSignup,
    signIn,
    signUp,
    signOut,
    restoreToken,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
