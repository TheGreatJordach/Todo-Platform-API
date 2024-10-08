import { BadRequestException } from "@nestjs/common";
import { Email } from "../types/email";
import { validateEmail } from "./email.util";

describe("validateEmail", () => {
  it("should return the email if the format is valid", () => {
    const validEmail = "test@example.com";

    const result: Email = validateEmail(validEmail);

    expect(result).toBe(validEmail); // Check that the email is returned
  });

  it("should throw a BadRequestException if the email format is invalid", () => {
    const invalidEmail = "invalid-email";

    expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException); // Expect an exception
    expect(() => validateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email contains spaces", () => {
    const emailWithSpaces = "test @example.com";

    expect(() => validateEmail(emailWithSpaces)).toThrow(BadRequestException); // Expect an exception
    expect(() => validateEmail(emailWithSpaces)).toThrow(
      `Invalid email format ${emailWithSpaces}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email has missing domain part", () => {
    const invalidEmail = "test@.com";

    expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException); // Expect an exception
    expect(() => validateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });

  it("should throw a BadRequestException if the email has missing '@' symbol", () => {
    const invalidEmail = "testexample.com";

    expect(() => validateEmail(invalidEmail)).toThrow(BadRequestException); // Expect an exception
    expect(() => validateEmail(invalidEmail)).toThrow(
      `Invalid email format ${invalidEmail}`
    ); // Check the message
  });
});
