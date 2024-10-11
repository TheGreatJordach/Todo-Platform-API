import { Module } from "@nestjs/common";
import { PasswordModule } from "./password/password.module";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./jwt/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { AccessTokenGuard } from "./authentication/guards/access-token/access-token.guard";
import { JwtTokenProvider } from "./jwt-token.provider";

@Module({
  imports: [
    PasswordModule,
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
    JwtTokenProvider,
  ],
})
export class IamModule {}
