import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entity/user-entity";
import { SharedTransactionsService } from "../../transactions/shared-transactions.service";
import { UserTransactionService } from "../../transactions/user-transaction.service";
import { Email } from "../../common/types/email";
import { validateEmail } from "../../common/util/email.util";

@Injectable()
export class UserService {
  constructor(
    private readonly sharedTransactions: SharedTransactionsService,
    private readonly userTransactionService: UserTransactionService
  ) {}

  /**
   * Asynchronously creates a transaction for adding a new user.
   *
   * @param newUser - The data transfer object representing the new user to be created.
   * @returns A Promise that resolves with the created User entity.
   * @throws ConflictException if a user with the same email or phone number already exists.
   * @throws InternalServerErrorException if there is an issue creating the user.
   */
  async createTransaction(newUser: CreateUserDto): Promise<User> {
    return this.sharedTransactions.createEntity<User>(User, newUser);
  }

  async findUserById(id: number): Promise<User> {
    return (await this.sharedTransactions.findOneEntityByID(User, id)) as User;
  }

  async findUserByEmail(email: Email): Promise<User | null> {
    try {
      const validatedEmail: Email = validateEmail(email);
      return await this.userTransactionService.findOneUserByEmail(
        User,
        validatedEmail
      );
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      else throw new InternalServerErrorException(`Cause : ${error.stack}`);
    }
  }
}
