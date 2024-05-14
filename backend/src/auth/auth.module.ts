import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports:[PassportModule,JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'20m'},
    }),
  
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema,
    }])],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[JwtStrategy,PassportModule,MongooseModule]
})
export class AuthModule {}
