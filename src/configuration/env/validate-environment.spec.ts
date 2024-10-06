import { InternalServerErrorException, Logger } from "@nestjs/common";
import { ValidateEnvironment, ValidatedEnv } from "./validate-environment"; // Adjust import path accordingly

describe("ValidateEnvironment", () => {
  let config: Record<string, unknown>;

  beforeEach(() => {
    config = {
      DB_HOST: "localhost",
      DB_PORT: 5432,
      DB_USER: "admin",
      DB_PASSWORD: "password",
      DB_NAME: "mydb",
      DB_ENGINE: "postgres",
      POSTGRES_URL: "postgres://user:password@localhost:5432/mydb",
      POSTGRES_USER: "user",
      POSTGRES_PASSWORD: "password",
      POSTGRES_DATABASE: "mydb",
      SWAGGER_DES: "API Description",
      SWAGGER_VER: "1.0",
      SWAGGER_ADD_SVR: "http://localhost:3000",
      SWAGGER_LICENCE: "MIT",
      SWAGGER_PREFIX: "api",
      APP_PORT: 3000,
    };
  });

  it("should validate successfully when the configuration is valid", () => {
    const result = ValidatedEnv(config);
    expect(result).toBeInstanceOf(ValidateEnvironment);
    expect(result.DB_HOST).toBe("localhost");
    expect(result.APP_PORT).toBe(3000);
  });

  it("should throw an InternalServerErrorException when a required field is missing", () => {
    delete config.DB_HOST; // Remove a required field

    expect(() => ValidatedEnv(config)).toThrow(InternalServerErrorException);
  });

  it("should throw an InternalServerErrorException when a field has an invalid type", () => {
    config.DB_PORT = "invalid_port"; // Invalid type (should be a number)

    expect(() => ValidatedEnv(config)).toThrow(InternalServerErrorException);
  });

  it("should log validation errors when validation fails", () => {
    const loggerSpy = jest.spyOn(Logger.prototype, "log");
    delete config.DB_HOST; // Remove a required field to cause validation failure

    expect(() => ValidatedEnv(config)).toThrow(InternalServerErrorException);
    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining("error(s) Failed validation")
    );
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining("DB_HOST"));
  });

  it("should throw an exception when an integer field is negative", () => {
    config.APP_PORT = -3000; // Invalid value (should be positive)

    expect(() => ValidatedEnv(config)).toThrow(InternalServerErrorException);
  });

  it("should throw an exception when a string field is empty", () => {
    config.DB_HOST = ""; // Invalid value (should not be empty)

    expect(() => ValidatedEnv(config)).toThrow(InternalServerErrorException);
  });
});
