import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_USER_KEY } from "../constant/user.constant";
/**
 * Usage
 * @Get('profile')
 * getProfile(@CurrentUser() user) {
 *   return user;
 * }
 * */
export const Currentuser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[REQUEST_USER_KEY]; // Extract user from the request
  }
);
