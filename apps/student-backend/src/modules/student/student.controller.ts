import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentService, RunCodeDto, SubmitQuizDto } from './student.service';

@ApiTags('Student Maker Space Microservice')
@Controller('api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get builder streak, enrolled 1:4 batch, stars & capstone progress' })
  getDashboard() {
    return this.studentService.getDashboard();
  }

  @Post('run-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Execute Python or Arduino C++ code in virtual rover sandbox' })
  runCode(@Body() body: RunCodeDto) {
    return this.studentService.runCode(body);
  }

  @Get('circuit-sim')
  @ApiOperation({ summary: 'Get virtual breadboard pin state and sensor telemetry' })
  getCircuitSim(@Query('distanceCm') distanceCm?: string) {
    const dist = distanceCm ? parseFloat(distanceCm) : 18;
    return this.studentService.getCircuitSim(dist);
  }

  @Get('quiz')
  @ApiOperation({ summary: 'Get rapid Speed Math & STEM sprint questions' })
  getQuiz() {
    return this.studentService.getQuizQuestions();
  }

  @Post('submit-quiz')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit quiz answer and earn stars' })
  submitQuiz(@Body() body: SubmitQuizDto) {
    return this.studentService.submitQuiz(body);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get capstone hardware & coding project milestones' })
  getProjects() {
    return this.studentService.getProjects();
  }
}
