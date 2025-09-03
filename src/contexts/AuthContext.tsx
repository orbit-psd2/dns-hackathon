import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userDatabase, UserDetails } from '@/data/userDatabase';

interface AuthContextType {
  user: UserDetails | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing JWT in localStorage
    const token = localStorage.getItem('dreamnity_jwt');
    const userId = localStorage.getItem('dreamnity_user_id');
    
    if (token && userId) {
      // Get user from database
      const userData = userDatabase.getUserById(userId);
      if (userData) {
        setUser(userData);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Authenticate user using database
    const authenticatedUser = userDatabase.authenticateUser(email, password);
    
    if (authenticatedUser) {
      const mockJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      localStorage.setItem('dreamnity_jwt', mockJWT);
      localStorage.setItem('dreamnity_user_id', authenticatedUser.id);
      setUser(authenticatedUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('dreamnity_jwt');
    localStorage.removeItem('dreamnity_user_id');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
