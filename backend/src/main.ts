import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
  })
  await app.listen(process.env.PORT || 3001);
  console.log(`[bootstrap] server is running on port: ${process.env.PORT || 3001}`)
}
bootstrap();
