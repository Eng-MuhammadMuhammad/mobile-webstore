import React, { createContext, useState, useEffect } from "react";

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user data for UI demonstration
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function (mock implementation for UI)
  const login = (email, password) => {
    // This is a mock implementation for UI demonstration
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: "1",
            name: "John Doe",
            email: email,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          };

          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Register function (mock implementation for UI)
  const register = (name, email, password) => {
    // This is a mock implementation for UI demonstration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const mockUser = {
            id: "1",
            name: name,
            email: email,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          };

          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error("Invalid registration data"));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
