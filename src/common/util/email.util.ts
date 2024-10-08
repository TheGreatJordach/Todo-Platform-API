import { Email } from "../types/email";
import { BadRequestException } from "@nestjs/common";

/**
 * Validates the format of an email address.
 *
 * @param email The email address to validate.
 * @returns The validated email address with the 'brand' symbol.
 * @throws BadRequestException if the email address format is invalid.
 */
export function validateEmail(email: string): Email {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
  if (!emailPattern.test(email)) {
    throw new BadRequestException(`Invalid email format ${email}`);
  }
  return email as Email; // Cast to an Email type
}
