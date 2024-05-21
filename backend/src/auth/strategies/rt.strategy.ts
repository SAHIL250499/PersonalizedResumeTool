import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: true,
            secretOrKey:process.env.RT_SECRET,
            passReqToCallback: true,
        })
    }

    private static extractJWT(req: Request): string | null{
        if(req.cookies && 'refresh_token' in req.cookies && req.cookies.refresh_token.length > 0){
            return req.cookies.refresh_token;
        }
        return null;
    }

    validate(req : Request,payload : any){
        let refreshToken;
        if(req.cookies && 'refresh_token' in req.cookies && req.cookies.refresh_token.length > 0){
            refreshToken = req?.get('cookie')?.replace('refresh_token=','').trim();
        }
        else{
        refreshToken =req?.get('authorization')?.replace('Bearer','').trim();
        }
        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
        return {
            ...payload,
            refreshToken
        };
    }
}

