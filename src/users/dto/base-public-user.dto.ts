import { Todo } from "../../todo/entity/todo-entity";
import { Expose, Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";

export class BasePublicUserDto {
  @Expose()
  @IsPositive()
  @IsInt()
  readonly userId: number;
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @Expose()
  @Type(() => Todo)
  @ValidateNested({ each: true })
  readonly todo: Todo[];
}
