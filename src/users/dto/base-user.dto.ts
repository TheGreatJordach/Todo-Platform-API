import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Todo } from "../../todo/entity/todo-entity";
import { Email } from "../../common/types/email";

export class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: Email;

  @Type(() => Todo)
  @ValidateNested({ each: true })
  todos: Todo[];
}
