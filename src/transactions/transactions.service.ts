import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { DataSource, DeepPartial, EntityTarget } from "typeorm";

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger("TransactionService");

  constructor(private readonly dataSource: DataSource) {}
  /**
   * Asynchronously creates a transaction for adding a new user.
   *
   * @returns A Promise that resolves with the created User entity.
   * @throws ConflictException if a user with the same email or phone number already exists.
   * @throws InternalServerErrorException if there is an issue creating the user.
   *
   * @example
   * // Usage example in UserService
   * async createTransaction(newUser: CreateUserDto): Promise<User> {
   *     return this.transactionService.createEntity<User>(User, newUser);
   *   }
   * Output: User entity with the provided details
   * @param entityClass
   * @param newEntity
   */
  async createEntity<T>(
    entityClass: EntityTarget<T>,
    newEntity: DeepPartial<T>
  ): Promise<T> {
    return await this.dataSource.transaction<T>(
      async (transactionalEntityManager) => {
        try {
          // Create the entity using the provided DTO and class
          const entity = transactionalEntityManager.create(
            entityClass,
            newEntity
          );

          // Save the entity inside the transaction
          return await transactionalEntityManager.save(entity);
        } catch (error) {
          // Handle unique constraint violation errors (Postgres error code 23505)
          if (error.code === "23505") {
            this.logger.error(
              `Conflict creating new record - Transaction Failed due to: ${error.detail}`
            );
            throw new ConflictException(
              `A conflict occurred - Transaction Failed.`
            );
          }

          // Log and throw an internal server error for any other issues
          this.logger.error(
            `Failed to create new entity due to: ${error.message}`
          );
          throw new InternalServerErrorException(
            `Failed to create new entity.`
          );
        }
      }
    );
  }
}
