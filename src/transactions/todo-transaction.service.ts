import { DataSource, EntityTarget } from "typeorm";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { UpdateTodoDto } from "../todo/dto/update-todo.dto";
import { Todo } from "../todo/entity/todo-entity";
import { DeleteTodoDto } from "../todo/dto/delete-todo.dto";
import { PaginationDto } from "../common/pagination.dto";
import { PaginationResultDto } from "../common/pagination.result.dto";

@Injectable()
export class TodoTransactionService {
  constructor(private readonly dataSource: DataSource) {}
  private readonly logger = new Logger("TransactionService");

  async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoDto,
    entityClass: EntityTarget<Todo> = Todo
  ) {
    return await this.dataSource.transaction<Todo | null>(
      async (transactionEntityManager) => {
        const findIt = await transactionEntityManager.findOneBy(entityClass, {
          id: id,
        });
        if (!findIt) {
          this.logger.error(`Todo with id ${id} not found`);
          return null;
        }
        try {
          this.logger.log(`Updated todo with id:${id} updated`);
          const updatedTodo = await transactionEntityManager.preload(
            entityClass,
            {
              id: id,
              ...updateTodoDto,
            }
          );

          return await transactionEntityManager.save(updatedTodo);
        } catch (error) {
          this.logger.error(`Failed to update Todo with id ${id}`);
          this.logger.debug(`Cause of error:${error.stack}`);
          throw new InternalServerErrorException();
        }
      }
    );
  }

  async remove(
    deleteTodoDto: DeleteTodoDto,
    entityClass: EntityTarget<Todo> = Todo
  ): Promise<void> {
    return await this.dataSource.transaction<void>(
      async (transactionManagerEntity) => {
        try {
          const totoToRemove: Todo = await transactionManagerEntity.findOneBy(
            entityClass,
            { id: deleteTodoDto.id, user: deleteTodoDto.user }
          );
          if (!totoToRemove) {
            throw new NotFoundException();
          }

          await transactionManagerEntity.remove(totoToRemove);
        } catch (error) {
          if (error instanceof NotFoundException) throw error;
          this.logger.error(
            `Failed to remade Todo with id ${deleteTodoDto.id} for user : ${deleteTodoDto.user.name}`
          );
          this.logger.debug(`Cause of error:${error.stack}`);
          throw new InternalServerErrorException();
        }
      }
    );
  }

  async findAll() {
    return this.dataSource.transaction<Todo[]>(
      async (transactionEntityManager) => {
        try {
          return await transactionEntityManager.find(Todo);
        } catch (error) {}
      }
    );
  }

  async pagination(
    paginationDto: PaginationDto,
    entityClass: EntityTarget<Todo> = Todo
  ) {
    const { page, limit } = paginationDto;
    return await this.dataSource.transaction(async (transactionEntity) => {
      try {
        const [data, totalCount] = await transactionEntity.findAndCount(
          entityClass,
          {
            skip: (page - 1) * limit,
            take: limit,
            //  order: sortBy ? { [sortBy]: order } : undefined,
          }
        );
        const totalPages = Math.ceil(totalCount / limit);
        return new PaginationResultDto<Todo>({
          data,
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        });
      } catch (error) {
        this.logger.log("Failed to return pagination");
        this.logger.debug(`Cause of error:${error.stack}`);
        throw new InternalServerErrorException();
      }
    });
  }
}
