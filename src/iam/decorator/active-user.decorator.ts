import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_USER_KEY } from "../constant/user.constant";
import { ActiveUserData } from "../interface/active-user-data.interface";

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  }
);
