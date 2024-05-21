import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator((_:undefined,context:ExecutionContext):number=>{
    const request = context.switchToHttp().getRequest();
    return request.user['userId'];
})