import { ConflictException, Inject, Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "../../users/dto/create-user.dto";

import { UserService } from "../../users/managment/user.service";
import { User } from "../../users/entity/user-entity";
import { PasswordService } from "../password/password.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../jwt/jwt.config";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger("AuthenticationService");
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  /**
   * Registers a new user in the system.
   *
   * This method handles the user registration process, including checking for
   * existing users to avoid conflicts, hashing the user's password, creating a
   * new user in the database, and handling any potential errors during the process.
   *
   * ### Workflow:
   * 1. **Conflict Check**: Verifies if a user with the provided email already exists
   *    by calling `this.userService.findUserByEmail`. If a user is found, a `ConflictException`
   *    is thrown.
   * 2. **Password Hashing**: Uses `this.passwordService.hashPassword` to hash the user's password
   *    securely before storing it in the database.
   * 3. **User Creation**: Once the password is hashed, the user is created through the
   *    `this.userService.createTransaction` method. The new user data is passed along with the
   *    hashed password.
   *
   * ### Possible Enhancements (Commented-out code):
   * - **Token Generation**: A token can be generated and returned for immediate use upon successful
   *   registration.
   * - **MeiliSearch Integration**: The user data can be indexed in MeiliSearch for search optimization.
   *
   * ### Error Handling:
   * - In the case of any database constraint violations or other unexpected errors, the method
   *   logs the details of the error using `this.logger.error`.
   * - Any exceptions from the underlying services (`userService`, `passwordService`) are propagated
   *   up and handled elsewhere in the application, ensuring that there is no redundant error handling
   *   layer in this method.
   *
   * @param {CreateUserDto} newUser - The data transfer object containing the user's registration information
   * (name, email, password, etc.).
   *
   * @throws {ConflictException} If a user with the same email already exists.
   * @throws {Error} Any error thrown from the underlying services, such as database or hashing errors,
   * is logged and propagated.
   *
   * @returns {Promise<User>} The newly created user after successful registration.
   */
  async registration(newUser: CreateUserDto): Promise<{ token: string }> {
    // Ovoid Conflict
    const userAlreadyExist: User = await this.userService.findUserByEmail(
      newUser.email
    );
    if (userAlreadyExist) {
      throw new ConflictException("User already exists");
    }

    try {
      // Hash Password
      const hashedPassword = await this.passwordService.hashPassword(
        newUser.password
      );
      const storedUser: User = await this.userService.createTransaction({
        ...newUser,
        password: hashedPassword,
      });

      return await this.signToken(storedUser);
      //next: Generate token
      // return Token
      // store user to meilisearch
    } catch (error) {
      this.logger.error(`Failed to create new user. Cause : ${error.detail}`);
      this.logger.error(`Details : ${error.stack}`);
      throw error;
    }
  }

  private async signToken(user: User) {
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      }
    );

    return {
      token: token,
    };
  }
}
