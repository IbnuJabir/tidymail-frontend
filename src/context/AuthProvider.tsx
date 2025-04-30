// context/AuthProvider.tsx
'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useAuth';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: true,
  isAuthenticated: false,
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading, error } = useUser();
  
  const publicRoutes = ['/login', '/signup', '/', '/auth/callback'];
  const isPublicRoute = publicRoutes.includes(pathname || '');

  useEffect(() => {
    if (isPublicRoute) {
      return;
    }

    if (!isLoading && error && !isPublicRoute) {
      router.push('/login');
    }
  }, [pathname, isLoading, error, isPublicRoute, router]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);