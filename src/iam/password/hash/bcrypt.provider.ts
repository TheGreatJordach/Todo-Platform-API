import { HashAlgorithmInterface } from "./hash-algorithm.interface";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException, Logger } from "@nestjs/common";

/**
 * Compares the provided data with an encrypted hash using bcrypt.
 *
 * @param data - The data to compare, should be a string.
 * @param hash - The hash to compare the data against.
 * @param encrypted - The encrypted data to compare with the hash.
 * @returns A Promise that resolves to true if the data matches the hash, false otherwise.
 * @throws InternalServerErrorException if an error occurs during the comparison process.
 */
export class BcryptProvider implements HashAlgorithmInterface {
  private readonly logger = new Logger("HashAlgorithmProvider");

  /**
   * @saltRound : Is part of the Global strategy for env validation,
   * An exception will be thrown, and app will stop if not provided
   * */
  private readonly saltRound = parseInt(process.env.SALT_ROUND || "12");

  /**
   * Compares the provided data with an encrypted hash using bcrypt.
   *
   * @param data - The data to compare, should be a string.
   * @param encrypted - The encrypted data to compare with the hash.
   * @returns A Promise that resolves to true if the data matches the hash, false otherwise.
   * @throws InternalServerErrorException if an error occurs during the comparison process.
   */
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    try {
      return await bcrypt.compare(data, encrypted);
    } catch (err) {
      this.logger.error("Failed to compare Password");
      this.logger.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * Asynchronously generates a bcrypt hash for the provided data.
   *
   * @param data - The data to be hashed, can be a string or a Buffer.
   * @returns A Promise that resolves to the generated bcrypt hash.
   * @throws InternalServerErrorException if an error occurs during the hashing process.
   */
  async hash(data: string | Buffer): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRound);
      return bcrypt.hashSync(data, salt);
    } catch (err) {
      this.logger.error("Failed to encrypt Password");
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
