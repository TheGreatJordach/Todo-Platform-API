import { Injectable } from "@nestjs/common";
import { SharedTransactionsService } from "../transactions/shared-transactions.service";
import { Todo } from "./entity/todo-entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { User } from "../users/entity/user-entity";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoTransactionService } from "../transactions/todo-transaction.service";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { extractedUser } from "./util/extract.user.data";
import { PaginationDto } from "../common/pagination.dto";

@Injectable()
export class TodoService {
  constructor(
    private readonly sharedTransactionsService: SharedTransactionsService,
    private readonly TodoTransactionService: TodoTransactionService
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

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    return this.TodoTransactionService.updateTodo(id, updateTodoDto);
  }
  async remove(deleteTodoDto: DeleteTodoDto) {
    //Removing the Todo{"id":1,"user":{"logger":{"context":"User Table","options":{}},"id":27,"name":"Brice Darnel","email":"lewis18@doe.com","password":
    const cleanUser = extractedUser(deleteTodoDto);

    await this.TodoTransactionService.remove({
      id: deleteTodoDto.id,
      user: cleanUser,
    });
  }

  async allTodo() {
    return await this.TodoTransactionService.findAll();
  }

  async paginateTodo(paginationDto: PaginationDto) {
    return await this.TodoTransactionService.pagination(paginationDto);
  }
}
