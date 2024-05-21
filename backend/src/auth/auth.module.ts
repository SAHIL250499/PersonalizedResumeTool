import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports:[JwtModule.register({}),
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema,
    }])],
  controllers: [AuthController],
  providers: [AuthService,AtStrategy,RtStrategy],
  exports:[MongooseModule]
})
export class AuthModule {}
