import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entity/todo-entity";
import { User } from "../users/entity/user-entity";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TransactionsModule } from "../transactions/transactions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    TypeOrmModule.forFeature([User]),
    TransactionsModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
