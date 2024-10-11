import { Expose } from "class-transformer";

export class PublicUpdatedTodoDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
}
