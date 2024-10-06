import { CreateUserDto } from "./create-user.dto";
import { OmitType } from "@nestjs/swagger";

export class LoginUserDto extends OmitType(CreateUserDto, ["todos", "name"]) {}
