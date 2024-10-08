import { UserTransactionService } from "../../transactions/user-transaction.service";
import { SharedTransactionsService } from "../../transactions/shared-transactions.service";
import { UserService } from "./user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../entity/user-entity";
import { Email } from "../../common/types/email";
import { BadRequestException, ConflictException } from "@nestjs/common";

describe("UserService", () => {
  let userService: UserService;
  let sharedTransactionsService: SharedTransactionsService;
  let userTransactionService: UserTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: SharedTransactionsService,
          useValue: {
            createEntity: jest.fn(),
            findOneEntityByID: jest.fn(),
          },
        },
        {
          provide: UserTransactionService,
          useValue: {
            findOneUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    sharedTransactionsService = module.get<SharedTransactionsService>(
      SharedTransactionsService
    );
    userTransactionService = module.get<UserTransactionService>(
      UserTransactionService
    );
  });

  describe("findUserById", () => {
    it("should find a user by ID", async () => {
      const userId = 1;

      const foundUser: User = {
        id: userId,
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        todos: [],
      } as User; // Using `as User` to specify the type explicitly;

      jest
        .spyOn(sharedTransactionsService, "findOneEntityByID")
        .mockResolvedValue(foundUser);

      const result = await userService.findUserById(userId);
      expect(result).toEqual(foundUser);
      expect(sharedTransactionsService.findOneEntityByID).toHaveBeenCalledWith(
        User,
        userId
      );
    });
  });

  describe("findUserByEmail", () => {
    it("should find a user by Email", async () => {
      const userEmail = "test@example.com" as Email;

      const foundUser: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        todos: [],
      } as User; // Using `as User` to specify the type explicitly;

      jest
        .spyOn(userTransactionService, "findOneUserByEmail")
        .mockResolvedValue(foundUser);

      const result = await userService.findUserByEmail(userEmail);
      expect(result).toEqual(foundUser);
      expect(userTransactionService.findOneUserByEmail).toHaveBeenCalledWith(
        User,
        userEmail
      );
    });

    it("should return null if Email not found", async () => {
      const userEmail: Email = "fake@example.com" as Email;

      jest
        .spyOn(userTransactionService, "findOneUserByEmail")
        .mockResolvedValue(null);

      const result = await userService.findUserByEmail(userEmail);
      expect(result).toEqual(null);
      expect(userTransactionService.findOneUserByEmail).toHaveBeenCalledWith(
        User,
        userEmail
      );
    });

    it("should throw a BadRequestException if Email format is wrong", async () => {
      const userEmail: Email = "fake@examplecom" as Email; // Invalid email format

      await expect(userService.findUserByEmail(userEmail)).rejects.toThrow(
        BadRequestException
      );

      // Ensure findOneUserByEmail is not called, since validation should fail first
      expect(userTransactionService.findOneUserByEmail).not.toHaveBeenCalled();
    });
  });

  describe("createTransaction", () => {
    it("should create a new User", async () => {
      const foundUser: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        todos: [],
      } as User; // Using `as User` to specify the type explicitly;

      jest
        .spyOn(sharedTransactionsService, "createEntity")
        .mockResolvedValue(foundUser);

      const result = await sharedTransactionsService.createEntity(
        User,
        foundUser
      );
      expect(result).toEqual(foundUser);
      expect(sharedTransactionsService.createEntity).toHaveBeenCalledWith(
        User,
        foundUser
      );
    });
  });

  it("should throw a ConflictException if the email already exists", async () => {
    const newUser: User = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      todos: [],
    } as User;

    // Mock createEntity to simulate the unique constraint violation
    jest.spyOn(sharedTransactionsService, "createEntity").mockRejectedValue(
      new ConflictException({
        message: "A conflict occurred - email already exists.",
        code: "23505",
        detail: "Key (email)=(test@example.com) already exists.",
      })
    );

    // Ensure the createTransaction method throws a ConflictException
    await expect(
      sharedTransactionsService.createEntity(User, newUser)
    ).rejects.toThrow(ConflictException);

    // Ensure createEntity was called with the new user data
    expect(sharedTransactionsService.createEntity).toHaveBeenCalledWith(
      User,
      newUser
    );
  });
});
