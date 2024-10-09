import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { UsersModule } from "./users/users.module";
import { TodoModule } from "./todo/todo.module";
import { IamModule } from "./iam/iam.module";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { TransactionsModule } from "./transactions/transactions.module";
import { AccessTokenGuard } from "./iam/authentication/guards/access-token/access-token.guard";

@Module({
  imports: [
    ConfigurationModule,
    UsersModule,
    TodoModule,
    IamModule,
    TransactionsModule,
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
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
})
export class AppModule {}
