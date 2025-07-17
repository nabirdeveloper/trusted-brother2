'use client';

// Client-side authentication utilities
// These functions can be used in client components

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

// Check if user has any of the allowed roles
export function hasAnyRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.some(role => hasPermission(userRole, role));
}