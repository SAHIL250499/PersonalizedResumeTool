import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:["http://localhost:3000"],
    credentials:true
  })
  await app.listen(3001);
  console.log(`[bootstrap] server is running on port: 3001`)
}
bootstrap();
