import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Logger } from "@nestjs/common";
import { User } from "../../users/entity/user-entity";

@Entity("todos")
export class Todo {
  private readonly logger = new Logger(Todo.name);
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @AfterInsert()
  afterInsert() {
    this.logger.log(`New todo Inserted : ID :${this.id}`);
  }
  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`Updated todo : ID :${this.id}`);
  }
  @AfterRemove()
  afterRemove() {
    this.logger.log(`todo : ID :${this.id} successfully removed`);
  }
}
