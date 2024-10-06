import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  validateSync,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { InternalServerErrorException, Logger } from "@nestjs/common";

/**
 * Class for validating environment variables related to AWS RDS, Vercel database, Swagger, and application settings.
 */
export class ValidateEnvironment {
  // AWS RDS
  @IsNotEmpty()
  @IsString()
  DB_HOST: string;
  @IsInt()
  @IsPositive()
  DB_PORT: number;
  @IsNotEmpty()
  @IsString()
  DB_USER: string;
  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  DB_NAME: string;
  @IsNotEmpty()
  @IsString()
  DB_ENGINE: string;

  // Vercel db prod
  @IsNotEmpty()
  @IsString()
  POSTGRES_URL: string;
  @IsNotEmpty()
  @IsString()
  POSTGRES_USER: string;
  @IsNotEmpty()
  @IsString()
  POSTGRES_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  POSTGRES_DATABASE: string;

  // SWAGGER
  @IsNotEmpty()
  @IsString()
  SWAGGER_DES: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_VER: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_ADD_SVR: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_LICENCE: string;
  @IsNotEmpty()
  @IsString()
  SWAGGER_PREFIX: string;

  // APPLICATION
  @IsInt()
  @IsPositive()
  APP_PORT: number;
}

/**
 * Validates the provided configuration object based on the ValidateEnvironment class rules.
 * Logs any validation errors and throws an InternalServerErrorException if errors are found.
 * Returns the validated configuration object.
 *
 * @param config - The configuration object to be validated.
 * @returns The validated configuration object.
 */
export function ValidatedEnv(config: Record<string, unknown>) {
  const logger = new Logger("Validated Env");
  const validated = plainToInstance(ValidateEnvironment, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    logger.log(`${errors.length} error(s) Failed validation`);
    logger.log(`${JSON.stringify(errors)}`);
    throw new InternalServerErrorException();
  }
  logger.log("😎 Environment Validation successfully validated 🍉");

  return validated;
}
