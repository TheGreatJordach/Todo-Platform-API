import { Module } from "@nestjs/common";
import { PasswordModule } from "./password/password.module";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./jwt/jwt.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    PasswordModule,
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class IamModule {}
