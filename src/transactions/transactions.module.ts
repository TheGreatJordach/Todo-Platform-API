import { Module } from "@nestjs/common";
import { SharedTransactionsService } from "./shared-transactions.service";
import { UserTransactionService } from "./user-transaction.service";

@Module({
  providers: [SharedTransactionsService, UserTransactionService],
  exports: [SharedTransactionsService, UserTransactionService],
})
export class TransactionsModule {}
