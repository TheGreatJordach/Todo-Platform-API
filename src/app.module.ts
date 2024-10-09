import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { UsersModule } from "./users/users.module";
import { TodoModule } from "./todo/todo.module";
import { IamModule } from "./iam/iam.module";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { TransactionsModule } from "./transactions/transactions.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigurationModule,
    UsersModule,
    TodoModule,
    IamModule,
    TransactionsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>("THROTTLER_TTL") || 60,
          limit: configService.get<number>("THROTTLER_LIMIT") || 5,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
