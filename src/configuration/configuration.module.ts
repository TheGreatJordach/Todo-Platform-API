import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { selectDbConfig } from "./database/database.config";
import { ValidatedEnv } from "./env/validate-environment";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", validate: ValidatedEnv }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: selectDbConfig,
    }),
  ],
})
export class ConfigurationModule {}
