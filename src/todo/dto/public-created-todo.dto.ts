import { Expose } from "class-transformer";

export class PublicCreatedTodoDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
}
