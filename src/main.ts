import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS for the admin frontend (comma-separated list in CORS_ORIGINS)
  app.enableCors({
    origin: (
      process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:5174'
    )
      .split(',')
      .map((origin) => origin.trim()),
    credentials: true,
  });
  // enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
