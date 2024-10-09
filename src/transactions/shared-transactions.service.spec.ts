import { Test, TestingModule } from "@nestjs/testing";
import { SharedTransactionsService } from "./shared-transactions.service";
import { DataSource } from "typeorm";

describe("TransactionsService", () => {
  let service: SharedTransactionsService;
  // Define the mock data source
  const mockDataSource = {
    transaction: jest.fn((callback) =>
      callback({
        create: jest.fn(),
        save: jest.fn(),
        findOneBy: jest.fn(),
      })
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SharedTransactionsService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<SharedTransactionsService>(SharedTransactionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
