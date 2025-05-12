import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth'; // Keep this for type reference

export type UserRole = 'citizen' | 'lawyer' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  city: string;
  role: UserRole;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, city: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip Firebase auth; just mark loading false after mount
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, displayName: string, city: string, role: UserRole) => {
    console.log(`Dummy signUp called with email: ${email}, password: ${password}, displayName: ${displayName}, city: ${city}, and role: ${role}`);
    // Add logic here to handle the sign-up process
    return;
  };

  const signIn = async () => {
    try {
      setLoading(true);

      // Dummy user object for development
      const dummyUser: User = {
        uid: 'dummy123',
        email: 'dummy@example.com',
        displayName: 'Dummy User',
        photoURL: 'https://via.placeholder.com/150',
        emailVerified: true,
        isAnonymous: false,
        metadata: {} as any,
        phoneNumber: null,
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: async () => { },
        getIdToken: async () => 'dummy-token',
        getIdTokenResult: async () => ({} as any),
        reload: async () => { },
        toJSON: () => ({}),
        providerId: ''
      };

      const dummyProfile: UserProfile = {
        uid: 'dummy123',
        displayName: 'Dummy User',
        email: 'dummy@example.com',
        photoURL: 'https://via.placeholder.com/150',
        city: 'Dummy City',
        role: 'admin',
        createdAt: new Date(),
      };

      setCurrentUser(dummyUser);
      setUserProfile(dummyProfile);
    } catch (error) {
      console.error('Error signing in (dummy):', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    console.log('Dummy Google sign-in used');
    return signIn();
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('No user is signed in');
    setUserProfile((prev) => ({ ...prev!, ...profile }));
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
