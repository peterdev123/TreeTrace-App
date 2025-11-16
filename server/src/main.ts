/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  console.log("Starting NestJS application for Render...");

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // 🔥 Render-ready CORS configuration
  app.enableCors({
    origin: [
      "https://ancestree.onrender.com",
      "http://localhost:3000"
    ],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization, Accept, Origin, X-Requested-With",
  });

  // Global validation
  app.useGlobalPipes(new ValidationPipe());

  // Health check route
  app.getHttpAdapter().get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      env: {
        mongodb_set: !!process.env.MONGODB_URI,
        jwt_secret_set: !!process.env.JWT_SECRET,
      }
    });
  });

  const port = process.env.PORT || 3000;
  
  // 🔥 IMPORTANT: You're missing the app.listen() call!
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();