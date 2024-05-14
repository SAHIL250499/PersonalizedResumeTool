import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration:false,
            secretOrKey:'secret',
        });
    }

    private static extractJWT(req:any):string|null{
        if(
            req.cookies && 'test' in req.cookies && req.cookies.test.length>0
        ){
            return req.cookies.test;
        }
        return null;
    }

    async validate(payload:any){
        console.log(`[JwtStrategy] validate: payload=${JSON.stringify(payload)}`)
        return payload;
    }


}