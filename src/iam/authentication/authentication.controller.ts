import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Serialize } from "../../common/interceptor/custom-serializer.interceptor";
import { PublicUserDTO } from "../../users/dto/public-user.dto";

@Serialize(PublicUserDTO)
@ApiTags("Registration")
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Registers a new user by calling the registration method in the AuthenticationService.
   *
   * @param {CreateUserDto} createUserDto - The data transfer object containing the user's registration information.
   * @returns { Promise<{ token: string }>} The access Token.
   */
  @ApiOperation({ summary: "create new user" })
  @ApiResponse({ status: 200, description: "User created successfully." })
  @ApiBody({ type: CreateUserDto })
  @Post("register")
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<{ token: string }> {
    return await this.authenticationService.registration(createUserDto);
  }
}
