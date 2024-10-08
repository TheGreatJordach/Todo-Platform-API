import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoTransactionService {
  constructor(private readonly dataSource: DataSource) {}
}
