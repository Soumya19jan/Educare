import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Cloud Run health check' })
  check() {
    return {
      status: 'ok',
      service: 'edusure-auth-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
