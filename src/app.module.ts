import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { UsersModule } from "./users/users.module";
import { TodoModule } from "./todo/todo.module";
import { IamModule } from "./iam/iam.module";
import { APP_PIPE } from "@nestjs/core";
import { TransactionsModule } from "./transactions/transactions.module";

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
  ],
})
export class AppModule {}
