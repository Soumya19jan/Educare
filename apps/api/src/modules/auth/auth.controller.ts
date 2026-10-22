import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class LoginDto {
  email: string;
  password: string;
}

class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return {
      message: 'Login endpoint',
      email: loginDto.email,
      token: 'jwt-token-here',
      user: {
        id: '123',
        email: loginDto.email,
        name: 'John Doe',
        role: 'STUDENT'
      }
    };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async register(@Body() registerDto: RegisterDto) {
    return {
      message: 'Registration endpoint',
      user: {
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        role: registerDto.role
      },
      token: 'jwt-token-here'
    };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh JWT token' })
  async refreshToken() {
    return {
      message: 'Refresh token endpoint',
      accessToken: 'new-jwt-token',
      refreshToken: 'new-refresh-token'
    };
  }
}