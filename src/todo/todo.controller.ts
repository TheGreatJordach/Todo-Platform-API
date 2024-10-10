import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { ActiveUser } from "../iam/decorator/active-user.decorator";
import { ActiveUserData } from "../iam/interface/active-user-data.interface";
import { TodoService } from "./todo.service";
import { User } from "../users/entity/user-entity";
import { AuthType } from "../iam/authentication/enums/auth-type.enum";
import { Auth } from "../iam/authentication/decorator/auth.decorator";

@Auth(AuthType.Bearer)
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTodoDto,
    @ActiveUser() loginUser: ActiveUserData
  ) {
    const { sub } = loginUser;
    const user: User = await this.todoService.findUserByID(sub);
    if (!user) throw new UnauthorizedException();
    return this.todoService.createTask({ ...createTaskDto, user });
  }
}
