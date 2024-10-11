import { User } from "../../users/entity/user-entity";
import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BaseTodoDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
  @ApiProperty({ type: User })
  @Type(() => User)
  user: User;
}
