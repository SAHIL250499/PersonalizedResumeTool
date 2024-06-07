import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Patch, Post, Req, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Public()
    @Post('/local/register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto:AuthDto,@Response({passthrough:true}) res){
        const {access_token,refresh_token,refresh_expires_in}=await this.authService.register(dto);
        res.cookie('refresh_token',refresh_token,{
            httpOnly:true,
            secure: true,
            expires:refresh_expires_in,
        });
        return {access_token,refresh_token};
    }
    
    @Public()
    @Post('/local/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto:AuthDto,@Response({passthrough:true}) res){
        const {access_token,refresh_token,refresh_expires_in}= await this.authService.login(dto);
        res.cookie('refresh_token',refresh_token,{
            httpOnly:true,
            secure: true,
            sameSite: 'none',
            expires:refresh_expires_in,
        });
        return {access_token,refresh_token};
    }
    
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId : number,@Response({passthrough:true}) res): Promise<boolean>{
        const response=this.authService.logout(userId);
        res.cookie('refresh_token','logout',{
            httpOnly:true,
            secure: true,
            sameSite: 'none',
            expires:new Date(Date.now())
        })
        return response;
    }
    
    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(@GetCurrentUserId() userId:number,@GetCurrentUser('refreshToken') refreshToken: string){
        const {access_token,refresh_token,refresh_expires_in}= await this.authService.refreshTokens(userId,refreshToken);
        return {access_token,refresh_token};
    }

    
    
}
