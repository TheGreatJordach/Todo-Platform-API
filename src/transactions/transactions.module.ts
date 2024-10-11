import { Module } from "@nestjs/common";
import { SharedTransactionsService } from "./shared-transactions.service";
import { UserTransactionService } from "./user-transaction.service";
import { TodoTransactionService } from "./todo-transaction.service";

@Module({
  providers: [
    SharedTransactionsService,
    UserTransactionService,
    TodoTransactionService,
  ],
  exports: [
    SharedTransactionsService,
    UserTransactionService,
    TodoTransactionService,
  ],
})
export class TransactionsModule {}
