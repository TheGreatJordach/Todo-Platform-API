import { Test, TestingModule } from "@nestjs/testing";
import { SharedTransactionsService } from "./shared-transactions.service";

describe("TransactionsService", () => {
  let service: SharedTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedTransactionsService],
    }).compile();

    service = module.get<SharedTransactionsService>(SharedTransactionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
