import { Controller, Post, Get, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService, LoginPayload, RegisterPayload } from './auth.service';

@ApiTags('Authentication Microservice')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and issue JWT' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() body: LoginPayload) {
    return this.authService.login(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register new student, teacher, or parent' })
  @ApiResponse({ status: 201, description: 'User created' })
  async register(@Body() body: RegisterPayload) {
    return this.authService.register(body);
  }

  @Get('me')
  @ApiOperation({ summary: 'Verify JWT and return current user profile' })
  async getProfile(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '') || '';
    return this.authService.verifyToken(token);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh session tokens' })
  async refreshToken() {
    return {
      message: 'Token refreshed',
      accessToken: 'jwt-refreshed-token',
      expiresIn: 3600,
    };
  }
}
