import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Todo } from "../../todo/entity/todo-entity";
import { Logger } from "@nestjs/common";
import { Email } from "../../common/types/email";

@Entity("users")
export class User {
  private readonly logger? = new Logger("User Table");
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: Email;
  @Column()
  password: string;
  @OneToMany(() => Todo, (todo) => todo.user, { onDelete: "CASCADE" })
  todos: Todo[];

  @AfterInsert()
  afterInsert() {
    this.logger.log(`Successfully created new User ${this.name} 🖐️`);
  }
  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`Successfully Updated 📢 User ${this.name}`);
    this.logger.log(`Total Todo list number ${this.todos.length}`);
  }
  @AfterRemove()
  afterRemove() {
    this.logger.log(`Successfully Removed 📢 User with ID: ${this.id}`);
  }
}
