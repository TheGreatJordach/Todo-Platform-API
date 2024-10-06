import { Module } from "@nestjs/common";
import { PasswordModule } from "./password/password.module";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [PasswordModule, UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class IamModule {}
