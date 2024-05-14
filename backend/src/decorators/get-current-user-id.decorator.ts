import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetCurrentUserId=createParamDecorator(
    (data:string,context:ExecutionContext)=>{
        const user = context.switchToHttp().getRequest().user;
        if (!user) {
            return null;
          }
        return data ? user[data] : user; 
    }
)