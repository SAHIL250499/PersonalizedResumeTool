import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Response } from "express";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        })
    }

    async validate( req:any,email: string, password: string,@Res({passthrough:true}) res:Response): Promise<any> {
        console.log(`[LocalStrategy] validate: email=${email}, password=${password}`)
        const user = await this.authService.validateUser({email, password});
        if (!user) throw new UnauthorizedException();
        
        return user;
      }
}