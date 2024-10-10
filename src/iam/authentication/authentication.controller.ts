import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthType } from "./enums/auth-type.enum";
import { Auth } from "./decorator/auth.decorator";
import { Throttle } from "@nestjs/throttler";
import { LoginUserDto } from "../../users/dto/login-user.dto";

@Throttle({ default: { limit: 5, ttl: 60 } }) // 5 request per minutes
@Auth(AuthType.None)
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
  ): Promise<{ token: string; refreshToken: string }> {
    return await this.authenticationService.registration(createUserDto);
  }

  @ApiOperation({ summary: "Refresh the token " })
  @ApiResponse({ status: 200, description: "Token successfully refresh." })
  @ApiBody({ type: RefreshTokenDto })
  @HttpCode(HttpStatus.OK)
  @Post("refresh-token")
  async refreshTokens(@Body() refreshToken: RefreshTokenDto) {
    return await this.authenticationService.refreshTokens(refreshToken);
  }

  @ApiOperation({ summary: "Login a user " })
  @ApiResponse({ status: 200, description: "User successfully Logged in." })
  @ApiBody({ type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.authenticationService.login(email, password);
  }
}
