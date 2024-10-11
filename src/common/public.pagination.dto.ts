import { Expose } from "class-transformer";

import { PublicCreatedTodoDto } from "../todo/dto/public-created-todo.dto";

export class PublicPaginationDto {
  @Expose()
  data: PublicCreatedTodoDto[];
  @Expose()
  page: number;
  @Expose()
  limit: number;
  @Expose()
  totalCount: number;
  @Expose()
  totalPages: number;
  @Expose()
  hasNextPage: boolean;
  @Expose()
  hasPreviousPage: boolean;
}
