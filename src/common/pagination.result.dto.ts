export class PaginationResultDto<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  constructor(partial: Partial<PaginationResultDto<T>>) {
    Object.assign(this, partial);
  }
}
