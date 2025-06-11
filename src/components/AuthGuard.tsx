'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: string;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireRole = 'ADMIN', 
  redirectTo = '/auth/sign-in' 
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push(redirectTo);
      return;
    }

    if (requireRole && session.user?.role !== requireRole) {
      router.push('/');
      return;
    }
  }, [session, status, router, requireRole, redirectTo]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || (requireRole && session.user?.role !== requireRole)) {
    return null;
  }

  return <>{children}</>;
} 