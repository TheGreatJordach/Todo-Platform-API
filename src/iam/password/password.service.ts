import { Injectable } from "@nestjs/common";
import { BcryptProvider } from "./hash/bcrypt.provider";

@Injectable()
export class PasswordService {
  constructor(private readonly hashAlgorithm: BcryptProvider) {}

  /**
   * Asynchronously hashes a password using the bcrypt algorithm.
   *
   * @param password - The password to be hashed, can be a string or a Buffer.
   * @returns A Promise that resolves to the hashed password.
   */
  async hashPassword(password: string | Buffer) {
    return await this.hashAlgorithm.hash(password);
  }

  /**
   * Compares a provided password with an encrypted password.
   *
   * @param providedPassword - The password to compare, can be a string or a Buffer.
   * @param encryptedPassword - The encrypted password to compare against.
   * @returns A Promise that resolves to a boolean indicating if the passwords match.
   */
  async comparePassword(
    providedPassword: string | Buffer,
    encryptedPassword: string
  ): Promise<boolean> {
    return await this.hashAlgorithm.compare(
      providedPassword,
      encryptedPassword
    );
  }
}
