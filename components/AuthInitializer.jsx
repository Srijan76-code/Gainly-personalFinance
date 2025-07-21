'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useAuthStore } from '@/stores/useAuthStore';

export const AuthInitializer = () => {
  const { user, isLoaded } = useUser();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (isLoaded) {
      setUser(user || null);
    }
  }, [isLoaded, user]);

  // ⛔ Avoid setting Zustand too early
  return null;
};
