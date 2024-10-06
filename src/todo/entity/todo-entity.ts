import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Logger } from "@nestjs/common";
import { User } from "../../users/entity/user-entity";

@Entity("todos")
export class Todo {
  private readonly logger = new Logger(Todo.name);
  @PrimaryGeneratedColumn()
  todoId: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToMany(() => User, (user) => user.todos)
  user: User;

  @AfterInsert()
  afterInsert() {
    this.logger.log(`New todo Inserted : ID :${this.todoId}`);
  }
  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`Updated todo : ID :${this.todoId}`);
  }
  @AfterRemove()
  afterRemove() {
    this.logger.log(`todo : ID :${this.todoId} successfully removed`);
  }
}
