import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isLoggedIn = await AuthService.isAuthenticated();
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        // Handle errors appropriately, e.g., log them or set a default value for isAuthenticated
        console.error('Error occurred while checking authentication:', error);
        setIsAuthenticated(false); // Set isAuthenticated to false or handle the error in another way
      }
    };

    const updateAuthStatus = (status) => {
      setIsAuthenticated(status);
    };

    checkAuthentication();

    AuthService.setAuthCallback(updateAuthStatus);

  }, []);

  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // throw new Error('useAuth must be used within an AuthProvider');
    return null;
  }
  return context;
};
