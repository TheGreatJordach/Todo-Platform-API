import { DataSource, EntityTarget } from "typeorm";
import { User } from "../users/entity/user-entity";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Email } from "../common/types/email";

@Injectable()
export class UserTransactionService {
  private readonly logger = new Logger("UserTransactionService");
  constructor(private readonly dataSource: DataSource) {}

  async findOneUserByEmail(
    entityClass: EntityTarget<User>,
    email: Email
  ): Promise<User | null> {
    return await this.dataSource.transaction<User>(
      async (transactionalEntityManager) => {
        try {
          // Use findOneOrFail to retrieve the entity by ID
          return await transactionalEntityManager.findOneBy(entityClass, {
            email: email, // Corrected typo
          });
        } catch (error) {
          console.log("Caught error:", error); // Check if the mocked error is being caught
          this.logger.log(
            `Issue when trying to retrieve user with email :${email} `
          );
          this.logger.error(`cause : ${error.stack}`);
          throw new InternalServerErrorException();
        }
      }
    );
  }
}
