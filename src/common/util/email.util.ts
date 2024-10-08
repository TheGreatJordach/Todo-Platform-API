import { Email } from "../types/email";
import { BadRequestException } from "@nestjs/common";

export function validateEmail(email: string): Email {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
  if (!emailPattern.test(email)) {
    throw new BadRequestException(`Invalid email format ${email}`);
  }
  return email as Email; // Cast to an Email type
}
