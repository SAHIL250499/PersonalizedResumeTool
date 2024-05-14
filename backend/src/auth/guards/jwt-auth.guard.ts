import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            console.log('Inside Jwt Strategy canActivate')
            return super.canActivate(context);
        }

}