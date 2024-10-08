import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "../../users/entity/user-entity";
import { Todo } from "../../todo/entity/todo-entity";

/**
 * Returns the TypeORM module options for connecting to a PostgreSQL database running in a Docker container.
 *
 * @param configService - The ConfigService instance for retrieving environment variables.
 * @returns TypeOrmModuleOptions with the necessary database connection configuration.
 */
export const getDockerDbConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.getOrThrow<string>("DATASOURCE_HOST"),
  port: configService.getOrThrow<number>("DATASOURCE_PORT"),
  database: configService.getOrThrow<string>("DATASOURCE_DATABASE"),
  username: configService.getOrThrow<string>("DATASOURCE_USERNAME"),
  password: configService.getOrThrow<string>("DATASOURCE_PASSWORD"),
  entities: [User, Todo],
  synchronize: true,
});

/**
 * Retrieves the configuration options for the Vercel database.
 *
 * @param configService - The configuration service to retrieve the necessary parameters.
 * @returns The TypeORM module options for connecting to the Vercel database.
 */
export const getVercelDbConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "postgres",
  url: configService.getOrThrow("POSTGRES_URL"),
  ssl: {
    rejectUnauthorized: true, // Ensure this is true when using a valid CA
    // ca: fs.readFileSync(caCertPath).toString(), // Adjust the path accordingly
  },
  username: configService.getOrThrow<string>("POSTGRES_USER"),
  password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
  database: configService.getOrThrow<string>("POSTGRES_DATABASE"),
  host: configService.getOrThrow<string>("POSTGRES_HOST"),
});

/**
 * Generates TypeORM configuration object for connecting to an AWS RDS PostgreSQL database.
 *
 * @param configService - The ConfigService instance for retrieving environment variables.
 * @returns TypeORM module options for the RDS PostgreSQL connection.
 */
export const getRDSConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  database: configService.getOrThrow<string>("DB_NAME"),
  username: configService.getOrThrow<string>("DB_USER"),
  password: configService.getOrThrow<string>("DB_PASSWORD"),
  entities: [User, Todo],
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Selects the appropriate TypeORM configuration based on the specified database engine, host, or port.
 *
 * @param configService - The ConfigService instance for retrieving environment variables.
 * @returns TypeORM module options for connecting to the specified database based on the configuration.
 */
export const selectDbConfig = async (configService: ConfigService) => {
  const logger = new Logger("Database Config");
  if (configService.get<string>("DB_ENGINE") === "docker") {
    logger.log("You are working on LOCAL DOCKER 🍉 db config");
    return getDockerDbConfig(configService);
  } else if (configService.get<string>("DB_ENGINE") === "vercel") {
    logger.log("You are working on VERCEL 🍉 db config");
    return getVercelDbConfig(configService);
  } else if (configService.get<string>("DB_ENGINE") === "postgres") {
    logger.log("You are working on AWS RDS 🍉 db config");
    return getRDSConfig(configService);
  }
  logger.warn("Please check the DB_ENGINE specified in the configuration");
  throw new InternalServerErrorException(
    "Invalid DB_ENGINE specified in configuration"
  );
};
