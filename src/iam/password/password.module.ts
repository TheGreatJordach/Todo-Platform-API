import { Module } from "@nestjs/common";
import { BcryptProvider } from "./hash/bcrypt.provider";
import { PasswordService } from "./password.service";

@Module({
  providers: [BcryptProvider, PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
