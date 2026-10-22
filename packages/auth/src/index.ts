// Auth utilities for EduSure
import { hashPassword, verifyPassword, generateToken, verifyToken } from './crypto';

// User roles
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  STAFF = 'STAFF',
}

// Role permissions mapping
export const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.SUPER_ADMIN]: ['*'],
  [UserRole.ADMIN]: ['manage:institution', 'manage:users', 'manage:courses', 'view:analytics'],
  [UserRole.TEACHER]: ['manage:courses', 'manage:assignments', 'manage:assessments', 'view:students'],
  [UserRole.STUDENT]: ['learn', 'submit:assignments', 'take:assessments', 'view:own-progress'],
  [UserRole.PARENT]: ['view:child-progress', 'view:attendance', 'communicate:teachers'],
  [UserRole.STAFF]: ['view:courses', 'view:students'],
};

// Check if user has permission
export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes('*') || permissions.includes(permission);
}

// Generate JWT tokens
export function generateAccessToken(userId: string, role: UserRole): string {
  return generateToken({ userId, role, type: 'access' }, '7d');
}

export function generateRefreshToken(userId: string): string {
  return generateToken({ userId, type: 'refresh' }, '30d');
}

// Verify tokens
export function verifyAccessToken(token: string) {
  return verifyToken(token);
}

export function verifyRefreshToken(token: string) {
  return verifyToken(token);
}

// Password hashing
export { hashPassword, verifyPassword };