import { Body, Controller, Get, HttpException, Patch, Post, Req, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req:Request,@Response({passthrough:true}) res) {
        const user=req.user;
        res.cookie('test',user['access_token'],{
            secure:true,
            expires:new Date(Date.now()+3600000)
        });
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:Request){
        console.log('Inside AuthController status method');
        console.log(req.user);
        return req.user;
    }

    @Post('register')
    async register(@Body() authPayload:any,@Response({passthrough:true}) res){
        console.log(`[AuthController] register ${authPayload}`);
        const user=await this.authService.register(authPayload);
        if(!user) throw new HttpException('Email already exists',401);
        res.cookie('test',user.access_token,{
            secure:true,
            expires:new Date(Date.now()+3600000)
        });
        return user
    }

    @Get('logout')
    async logout(@Response({passthrough:true}) res){
        res.cookie('test','logout',{secure:true,expires:new Date(Date.now())})
        return {};
    }

    
    
}
