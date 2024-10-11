import { DeleteTodoDto } from "../dto/delete-todo.dto";
import { User } from "../../users/entity/user-entity";

export function extractedUser(dto: DeleteTodoDto): User {
  const { user } = dto;
  const { id, name, email } = user;
  return { id, name, email } as User;
}
