import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParentService, SchedulePtmDto, SendMessageDto } from './parent.service';

@ApiTags('Parent Companion Microservice')
@Controller('api/parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Get('children')
  @ApiOperation({ summary: 'Get all enrolled children under this parent account' })
  getChildren() {
    return this.parentService.getChildren();
  }

  @Get('live-status')
  @ApiOperation({ summary: 'Get real-time live video classroom attendance status' })
  getLiveStatus(@Query('childId') childId?: string) {
    return this.parentService.getLiveStatus(childId);
  }

  @Get('hardware-kits')
  @ApiOperation({ summary: 'Track doorstep delivery of physical robotics & IoT kits' })
  getHardwareKits() {
    return this.parentService.getHardwareKits();
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get child project portfolio (Autonomous rover, code count)' })
  getProjects(@Query('childId') childId?: string) {
    return this.parentService.getProjects(childId);
  }

  @Get('ptm-bookings')
  @ApiOperation({ summary: 'Get all scheduled 1-on-1 parent-teacher conferences' })
  getPtmBookings() {
    return this.parentService.getPtmBookings();
  }

  @Post('schedule-ptm')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Schedule a 15-minute 1-on-1 video conference with mentor' })
  schedulePtm(@Body() body: SchedulePtmDto) {
    return this.parentService.schedulePtm(body);
  }

  @Get('messages')
  @ApiOperation({ summary: 'Get direct messaging conversation history with tutor' })
  getMessages() {
    return this.parentService.getMessages();
  }

  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send direct message to child mentor' })
  sendMessage(@Body() body: SendMessageDto) {
    return this.parentService.sendMessage(body);
  }
}
