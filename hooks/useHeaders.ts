'use client';

import { useSession } from 'next-auth/react';

export const useHeaders = () => {
  const session = useSession();
  if (session?.status !== 'authenticated') return null;
  return {
    headers: {
      Authorization: `Bearer ${session?.data?.authToken}`
    }
  };
};
