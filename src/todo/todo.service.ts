import { Injectable } from "@nestjs/common";
import { SharedTransactionsService } from "../transactions/shared-transactions.service";
import { Todo } from "./entity/todo-entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { User } from "../users/entity/user-entity";

@Injectable()
export class TodoService {
  constructor(
    private readonly sharedTransactionsService: SharedTransactionsService
  ) {}

  createTask(createTodoDto: CreateTodoDto) {
    return this.sharedTransactionsService.createEntity<Todo>(
      Todo,
      createTodoDto
    );
  }

  async findUserByID(id: number): Promise<User> {
    return (await this.sharedTransactionsService.findOneEntityByID(
      User,
      id
    )) as User;
  }
}
