import { User } from "../../users/entity/user-entity";
import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class DeleteTodoDto {
  @IsPositive()
  @IsInt()
  id: number;
  @Type(() => User)
  user: User;
}
