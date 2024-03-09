import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieSession from 'cookie-session';
import express from 'express';
import { join } from 'path';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'http://localhost:3000', // Replace with the origin of your React application
      credentials: true,
    });


    app.use('/uploads', express.static('uploads'));
    app.use(
      cookieSession({
        name: 'session',
        keys: ['SECRET'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }),
    );
    // Enable CORS
    

    await app.listen(8080);
}
bootstrap();
