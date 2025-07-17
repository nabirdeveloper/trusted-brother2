import { getServerSession } from 'next-auth';
import { authOptions } from './auth-server';
import { redirect } from 'next/navigation';

// Server-side authentication utilities
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getAuthSession();
  if (!session) {
    redirect('/auth/signin');
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'admin') {
    redirect('/');
  }
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/');
  }
  return session;
}

// Check if user has specific permission
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    'user': 0,
    'moderator': 1,
    'admin': 2,
  };
  
  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] ?? -1;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] ?? 999;
  
  return userLevel >= requiredLevel;
}

// Validate user permissions for specific actions
export function canManageProducts(userRole: string): boolean {
  return hasPermission(userRole, 'admin');
}

export function canManageOrders(userRole: string): boolean {
  return hasPermission(userRole, 'moderator');
}

export function canViewAdminDashboard(userRole: string): boolean {
  return hasPermission(userRole, 'moderator');
}

export function canManageUsers(userRole: string): boolean {
  return hasPermission(userRole, 'admin');
}