import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule,MongooseModule.forRoot('mongodb://127.0.0.1/nest'), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
