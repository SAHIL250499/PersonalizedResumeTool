import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import axios from 'axios';
import * as cron from 'node-cron';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
  })

  // Schedule a cron job to call the backend API every 14 minutes
  cron.schedule('*/14 * * * *', async () => {
    console.log('[Cron] Triggering backend API...');
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/auth/healthcheck`);
      console.log(`[Cron] Backend response: ${response.data.message}`);
    } catch (error) {
      console.error(`[Cron Error] Failed to call backend API:`, error.message);
    }
  });






  await app.listen(process.env.PORT || 3001);
  console.log(`[bootstrap] server is running on port: ${process.env.PORT || 3001}`)
}
bootstrap();
