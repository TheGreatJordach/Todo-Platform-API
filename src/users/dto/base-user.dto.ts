import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Todo } from "../../todo/entity/todo-entity";

export class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;

  @Type(() => Todo)
  @ValidateNested({ each: true })
  todos: Todo[];
}
