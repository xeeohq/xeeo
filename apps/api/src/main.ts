import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  const appName = configService.get<string>('app.name');

  await app.listen(port ?? 3001);

  console.log('');
  console.log('========================================');
  console.log(`🚀 ${appName} started successfully`);
  console.log(`🌐 http://localhost:${port}`);
  console.log('========================================');
}

bootstrap();