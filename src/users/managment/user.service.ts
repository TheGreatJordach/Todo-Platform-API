import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entity/user-entity";
import { TransactionsService } from "../../transactions/transactions.service";

@Injectable()
export class UserService {
  constructor(
    private readonly transactionService: TransactionsService // Injecting DataSource for transactions
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
    return this.transactionService.createEntity<User>(User, newUser);
  }
}
