import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { ParentModule } from './modules/parent/parent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ParentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
