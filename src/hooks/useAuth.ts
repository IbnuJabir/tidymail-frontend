// hooks/useAuth.ts
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, AuthResponse, ApiResponse } from '@/types/auth';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      try {
        const { data } = await api.get<AuthResponse>('/user/me');
        return data.data as User;
      } catch (error) {
        throw new Error(`Failed to fetch user: ${error}`);
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.clear();
      router.push('/login');
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileData: { name: string }): Promise<ApiResponse<User>> => {
      const { data } = await api.put<ApiResponse<User>>('/user/me', profileData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useDeleteAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (): Promise<AuthResponse> => {
      const { data } = await api.delete<AuthResponse>('/user/me');
      return data;
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
}