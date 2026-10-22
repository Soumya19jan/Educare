import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('EduSure Parent Companion Microservice')
    .setDescription('Real-time Child Progress, Hardware Kit GPS Tracking & PTM Scheduling (Cloud Run Ready)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Cloud Run sets PORT environment variable (default 8080 on Cloud Run, 4002 local)
  const PORT = process.env.PORT || 4002;
  await app.listen(PORT, '0.0.0.0');

  console.log(`👨‍👩‍👧 EduSure Parent Microservice running on http://0.0.0.0:${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api/docs`);
  console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
}

bootstrap();
