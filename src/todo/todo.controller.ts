import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { ActiveUser } from "../iam/decorator/active-user.decorator";
import { ActiveUserData } from "../iam/interface/active-user-data.interface";
import { TodoService } from "./todo.service";
import { User } from "../users/entity/user-entity";
import { AuthType } from "../iam/authentication/enums/auth-type.enum";
import { Auth } from "../iam/authentication/decorator/auth.decorator";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { IdDto } from "../common/id.dto";
import { Serialize } from "../common/interceptor/custom-serializer.interceptor";
import { PublicCreatedTodoDto } from "./dto/public-created-todo.dto";
import { PublicUpdatedTodoDto } from "./dto/public-updated-todo.dto";

import { PaginationDto } from "../common/pagination.dto";

import { Throttle } from "@nestjs/throttler";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("todos")
@ApiBearerAuth()
@Throttle({ default: { limit: 5, ttl: 60 } })
@Auth(AuthType.Bearer)
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: "Get all Task" })
  @ApiResponse({ status: 200, description: "Task created successfully." })
  @Serialize(PublicCreatedTodoDto)
  @Get("all")
  async all() {
    return await this.todoService.allTodo();
  }

  @ApiOperation({ summary: "Create a new Task " })
  @ApiResponse({ status: 200, description: "Task successfully created." })
  @ApiBody({ type: CreateTodoDto })
  @Serialize(PublicCreatedTodoDto)
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTodoDto,
    @ActiveUser() activeUserData: ActiveUserData
  ) {
    const getUser: User = await this.verifyUser(activeUserData);
    return this.todoService.createTask({ ...createTaskDto, user: getUser });
  }

  @ApiOperation({ summary: "Update a given Task " })
  @ApiResponse({ status: 200, description: "Task successfully Updated." })
  @ApiBody({ type: UpdateTodoDto })
  @Serialize(PublicUpdatedTodoDto)
  @Put(":id")
  async update(
    @Body() updateTaskDto: UpdateTodoDto,
    @Param() { id }: IdDto,
    @ActiveUser() activeUserData: ActiveUserData
  ) {
    const getUser: User = await this.verifyUser(activeUserData);
    return this.todoService.updateTodo(id, { ...updateTaskDto, user: getUser });
  }

  @ApiOperation({ summary: "Delete a given Task " })
  @ApiResponse({ status: 200, description: "Task successfully Deleted." })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  async deleteTask(
    @ActiveUser() activeUserData: ActiveUserData,
    @Param() { id }: IdDto
  ): Promise<void> {
    const getUser: User = await this.verifyUser(activeUserData);
    return this.todoService.remove({ id, user: getUser });
  }

  async verifyUser(loginUser: ActiveUserData): Promise<User> {
    const { sub } = loginUser;
    const user: User = await this.todoService.findUserByID(sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Get()
  async paginateUsers(@Query() paginationDto: PaginationDto) {
    return this.todoService.paginateTodo(paginationDto);
  }
}
