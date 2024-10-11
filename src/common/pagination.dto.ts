import { IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1; // default page 1

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 10; // default 10 items per page

  @IsOptional()
  @IsString()
  sortBy?: string; // optional sorting field

  @IsOptional()
  @IsString()
  order?: "ASC" | "DESC" = "ASC"; // default order ASC
}
