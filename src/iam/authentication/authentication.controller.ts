import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../../users/entity/user-entity";

@ApiTags("Registration")
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Registers a new user by calling the registration method in the AuthenticationService.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the user's registration information.
   * @returns {Promise<User>} The newly created user after successful registration.
   */
  @ApiOperation({ summary: "create new user" })
  @ApiResponse({ status: 200, description: "User created successfully." })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authenticationService.registration(createUserDto);
  }
}
