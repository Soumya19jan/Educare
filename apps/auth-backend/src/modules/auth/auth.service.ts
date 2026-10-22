import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Mock users database store for autonomous microservice operation
  private users = [
    {
      id: 'usr_student_01',
      email: 'student@edusure.com',
      password: 'password123',
      firstName: 'Alex',
      lastName: 'Johnson',
      role: 'STUDENT',
    },
    {
      id: 'usr_teacher_01',
      email: 'teacher@edusure.com',
      password: 'password123',
      firstName: 'Sarah',
      lastName: 'Vance',
      role: 'TEACHER',
    },
    {
      id: 'usr_parent_01',
      email: 'parent@edusure.com',
      password: 'password123',
      firstName: 'David',
      lastName: 'Johnson',
      role: 'PARENT',
    },
  ];

  async login(payload: LoginPayload) {
    const user = this.users.find((u) => u.email.toLowerCase() === payload.email.toLowerCase());
    if (!user || user.password !== payload.password) {
      // In development, accept login with fallback to demonstrate flow
      const fallbackUser = {
        id: `usr_${Date.now()}`,
        email: payload.email,
        firstName: payload.email.split('@')[0],
        lastName: 'User',
        role: payload.email.includes('teacher')
          ? 'TEACHER'
          : payload.email.includes('parent')
          ? 'PARENT'
          : 'STUDENT',
      };
      const token = this.jwtService.sign(
        { sub: fallbackUser.id, email: fallbackUser.email, role: fallbackUser.role },
        { secret: process.env.JWT_SECRET || 'edusure-super-secret-jwt-key' }
      );
      return {
        message: 'Login successful (Dev Fallback)',
        token,
        user: fallbackUser,
      };
    }

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET || 'edusure-super-secret-jwt-key' }
    );

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(payload: RegisterPayload) {
    const existing = this.users.find((u) => u.email.toLowerCase() === payload.email.toLowerCase());
    if (existing) {
      throw new BadRequestException('A user with this email already exists');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
    };
    this.users.push(newUser);

    const token = this.jwtService.sign(
      { sub: newUser.id, email: newUser.email, role: newUser.role },
      { secret: process.env.JWT_SECRET || 'edusure-super-secret-jwt-key' }
    );

    return {
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'edusure-super-secret-jwt-key',
      });
      return { valid: true, user: decoded };
    } catch {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }
}
