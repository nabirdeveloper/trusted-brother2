'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { hasPermission } from '@/lib/client-auth-utils';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null,
  requireAuth = true 
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (requireAuth && !session) {
    return fallback;
  }

  if (session && !allowedRoles.some(role => hasPermission(session.user.role, role))) {
    return fallback;
  }

  return <>{children}</>;
}

// Convenience components for common role checks
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function ModeratorOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['moderator']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function AuthenticatedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['user']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}