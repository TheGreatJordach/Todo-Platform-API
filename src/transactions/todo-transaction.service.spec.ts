import { Test, TestingModule } from "@nestjs/testing";
import { DataSource, EntityManager } from "typeorm";
import { TodoTransactionService } from "./todo-transaction.service";
import { UpdateTodoDto } from "../todo/dto/update-todo.dto";
import { DeleteTodoDto } from "../todo/dto/delete-todo.dto";
import { Todo } from "../todo/entity/todo-entity";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";

describe("TodoTransactionService", () => {
  let service: TodoTransactionService;
  let dataSource: DataSource;
  let transactionManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoTransactionService,
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoTransactionService>(TodoTransactionService);
    dataSource = module.get<DataSource>(DataSource);
    transactionManager = {
      findOneBy: jest.fn(),
      preload: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      find: jest.fn(),
      findAndCount: jest.fn(),
    } as unknown as EntityManager;
  });

  describe("updateTodo", () => {
    it("should successfully update a todo", async () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = { title: "Updated Title" };
      const todo = { id, title: "Old Title" } as Todo;
      const updatedTodo = { ...todo, ...updateTodoDto };

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(todo);
      transactionManager.preload = jest.fn().mockResolvedValue(updatedTodo);
      transactionManager.save = jest.fn().mockResolvedValue(updatedTodo);

      const result = await service.updateTodo(id, updateTodoDto);
      expect(result).toEqual(updatedTodo);
      expect(transactionManager.findOneBy).toHaveBeenCalledWith(Todo, { id });
      expect(transactionManager.save).toHaveBeenCalledWith(updatedTodo);
    });

    it("should throw NotFoundException if todo is not found", async () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = { title: "Updated Title" };

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(null);

      const result = await service.updateTodo(id, updateTodoDto);
      expect(result).toEqual(null);
      expect(transactionManager.findOneBy).toHaveBeenCalledWith(Todo, { id });
    });

    it("should throw InternalServerErrorException on save error", async () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = { title: "Updated Title" };
      const todo = { id, title: "Old Title" } as Todo;

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(todo);
      transactionManager.preload = jest.fn().mockResolvedValue(todo);
      transactionManager.save = jest
        .fn()
        .mockRejectedValue(new Error("Save Error"));

      await expect(service.updateTodo(id, updateTodoDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("remove", () => {
    it("should successfully remove a todo", async () => {
      const deleteTodoDto: DeleteTodoDto = {
        id: 1,
        user: { id: 1, name: "John", email: "john@example.com" } as any,
      };
      const todo = { id: 1, user: deleteTodoDto.user } as Todo;

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(todo);
      transactionManager.remove = jest.fn().mockResolvedValue(undefined);

      await service.remove(deleteTodoDto);
      expect(transactionManager.findOneBy).toHaveBeenCalledWith(Todo, {
        id: deleteTodoDto.id,
        user: deleteTodoDto.user,
      });
      expect(transactionManager.remove).toHaveBeenCalledWith(todo);
    });

    it("should throw NotFoundException if todo is not found", async () => {
      const deleteTodoDto: DeleteTodoDto = {
        id: 1,
        user: { id: 1, name: "John", email: "john@example.com" } as any,
      };

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(null);

      await expect(service.remove(deleteTodoDto)).rejects.toThrow(
        NotFoundException
      );
      expect(transactionManager.findOneBy).toHaveBeenCalledWith(Todo, {
        id: deleteTodoDto.id,
        user: deleteTodoDto.user,
      });
    });

    it("should throw InternalServerErrorException on remove error", async () => {
      const deleteTodoDto: DeleteTodoDto = {
        id: 1,
        user: { id: 1, name: "John", email: "john@example.com" } as any,
      };
      const todo = { id: 1, user: deleteTodoDto.user } as Todo;

      jest
        .spyOn(dataSource, "transaction")
        .mockImplementation(
          async (
            isolationOrCallback:
              | IsolationLevel
              | ((manager: EntityManager) => Promise<any>),
            maybeCallback?: (manager: EntityManager) => Promise<any>
          ) => {
            // If the first argument is an isolation level, call the second argument as the callback
            if (typeof isolationOrCallback === "string") {
              return maybeCallback!(transactionManager);
            }

            // Otherwise, it's a callback
            return isolationOrCallback(transactionManager);
          }
        );

      transactionManager.findOneBy = jest.fn().mockResolvedValue(todo);
      transactionManager.remove = jest
        .fn()
        .mockRejectedValue(new Error("Remove Error"));

      await expect(service.remove(deleteTodoDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
