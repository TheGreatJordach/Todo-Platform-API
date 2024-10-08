import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Todo } from "../../todo/entity/todo-entity";
import { Email } from "../../common/types/email";
import { ApiProperty } from "@nestjs/swagger";

export class BaseUserDto {
  @ApiProperty({ example: "John Doe" })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: "John@example.com" })
  @IsNotEmpty()
  @IsEmail()
  email: Email;
  @ApiProperty({
    type: [Todo],
    description: "List of todos associated with the user",
    example: [
      { id: 1, title: "Todo 1", completed: false },
      { id: 2, title: "Todo 2", completed: true },
    ],
  })
  @Type(() => Todo)
  @ValidateNested({ each: true })
  todos: Todo[];
}
