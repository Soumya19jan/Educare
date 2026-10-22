import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AssignmentsModule } from './modules/assignments/assignments.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    AssignmentsModule,
    SessionsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}