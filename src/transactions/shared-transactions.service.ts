import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, DeepPartial, EntityTarget } from "typeorm";

import { Todo } from "../todo/entity/todo-entity";
import { User } from "../users/entity/user-entity";

@Injectable()
export class SharedTransactionsService {
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
              "A conflict occurred - email already exists."
            );
          }
          throw error;
        }
      }
    );
  }

  /**
   * Asynchronously finds an entity by its ID within a transaction.
   *
   * @param entityClass The class of the entity to search for (Todo or User).
   * @param id The ID of the entity to find.
   * @returns A Promise that resolves with the found entity.
   * @throws NotFoundException if the entity with the provided ID is not found.
   */
  async findOneEntityByID(entityClass: EntityTarget<Todo | User>, id: number) {
    return await this.dataSource.transaction<Todo | User>(
      async (transactionalEntityManager) => {
        try {
          return await transactionalEntityManager.findOneBy(entityClass, {
            id: id,
          });
        } catch (error) {
          if (entityClass === Todo) {
            this.logger.log(`No Todo with id:${id} found`);
          } else if (entityClass === User) {
            this.logger.log(`No User with id:${id} found`);
          }
          const message = `${entityClass === Todo ? "Todo" : "User"} with id: ${id} not found`;
          throw new NotFoundException(message);
        }
      }
    );
  }
}
