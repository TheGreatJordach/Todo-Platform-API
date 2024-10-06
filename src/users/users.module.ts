import { Module } from "@nestjs/common";
import { UserService } from "./managment/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user-entity";
import { TransactionsModule } from "../transactions/transactions.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionsModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
