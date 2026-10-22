import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherService, AwardStarsDto, PostNoteDto } from './teacher.service';

@ApiTags('Teacher Workstation Microservice')
@Controller('api/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('batches')
  @ApiOperation({ summary: 'Get all 1:4 student batches assigned to this teacher' })
  getBatches() {
    return this.teacherService.getBatches();
  }

  @Get('students')
  @ApiOperation({ summary: 'Get roster of students in batch with real-time hardware & code telemetry' })
  getStudents(@Query('batchId') batchId?: string) {
    return this.teacherService.getStudents(batchId);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Get tutor hours taught, hourly rate, and monthly earnings breakdown' })
  getPayouts() {
    return this.teacherService.getProfileAndPayouts();
  }

  @Post('award-stars')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Award gamified star coins to a student for solving code/circuit problem' })
  awardStars(@Body() body: AwardStarsDto) {
    return this.teacherService.awardStars(body);
  }

  @Post('post-note')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Dispatch post-session summary digest to parents via WhatsApp and portal' })
  postNote(@Body() body: PostNoteDto) {
    return this.teacherService.postNote(body);
  }

  @Get('telemetry')
  @ApiOperation({ summary: 'Stream active Arduino sensor telemetry and student compiler status' })
  getTelemetry() {
    return this.teacherService.getTelemetry();
  }
}
