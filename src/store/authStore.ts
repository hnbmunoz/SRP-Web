import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createEncryptedStorage } from '../utils/encryptedStorage';
import { clearEncryptionKeys } from '../utils/encryption';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

// Authentication credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  specialties?: (string | number)[];
}

// Authentication state interface
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}

// Mock users for simulation
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'moderator@example.com',
    name: 'Moderator User',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  },
];

// Simulate API delay
const simulateDelay = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Generate mock JWT token
const generateMockToken = (user: User): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login simulation
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          await simulateDelay(1500); // Simulate network delay
          
          // Find user by email
          const user = mockUsers.find(u => u.email === credentials.email);
          
          if (!user) {
            throw new Error('User not found');
          }
          
          // Simple password validation (in real app, this would be handled by backend)
          if (credentials.password !== 'password123') {
            throw new Error('Invalid password');
          }
          
          // Update last login
          const updatedUser = { ...user, lastLogin: new Date().toISOString() };
          const token = generateMockToken(updatedUser);
          
          set({
            user: updatedUser,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false
          });
          throw error;
        }
      },

      // Register simulation
      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          await simulateDelay(2000); // Simulate network delay
          
          // Check if user already exists
          const existingUser = mockUsers.find(u => u.email === credentials.email);
          if (existingUser) {
            throw new Error('User already exists');
          }
          
          // Create new user
          const newUser: User = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name,
            role: 'user',
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          
          // Add to mock users (in real app, this would be handled by backend)
          mockUsers.push(newUser);
          
          const token = generateMockToken(newUser);
          
          set({
            user: newUser,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        // Clear encryption keys for security
        clearEncryptionKeys();
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Update user
      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...userData };
          set({ user: updatedUser });
        }
      },

      // Refresh token simulation
      refreshToken: async () => {
        const { user } = get();
        if (user) {
          set({ isLoading: true });
          try {
            await simulateDelay(500);
            const newToken = generateMockToken(user);
            set({ token: newToken, isLoading: false });
          } catch {
            set({
              error: 'Failed to refresh token',
              isLoading: false
            });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createEncryptedStorage<Pick<AuthState, 'user' | 'token' | 'isAuthenticated'>>(),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

// Utility hooks for common auth operations
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    register: store.register,
    logout: store.logout,
    clearError: store.clearError,
    updateUser: store.updateUser,
    refreshToken: store.refreshToken,
  };
};

// Role-based access control hook
export const useRole = () => {
  const user = useAuthStore(state => state.user);
  
  return {
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator',
    isUser: user?.role === 'user',
    hasRole: (role: User['role']) => user?.role === role,
    hasAnyRole: (roles: User['role'][]) => user ? roles.includes(user.role) : false,
  };
};