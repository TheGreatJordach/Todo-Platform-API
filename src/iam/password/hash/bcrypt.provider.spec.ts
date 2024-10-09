import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { BcryptProvider } from "./bcrypt.provider";

jest.mock("bcrypt");

describe("BcryptProvider", () => {
  let bcryptProvider: BcryptProvider;

  beforeEach(() => {
    bcryptProvider = new BcryptProvider(); // No arguments needed
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hash", () => {
    it("should hash the data successfully", async () => {
      const data = "password123";
      const hashedValue = "hashed_value";

      (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt");
      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedValue);

      const result = await bcryptProvider.hash(data);

      expect(result).toEqual(hashedValue);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(12); // Default to 12
      expect(bcrypt.hashSync).toHaveBeenCalledWith(data, "salt");
    });

    it("should throw an InternalServerErrorException on error", async () => {
      const data = "password123";

      (bcrypt.genSalt as jest.Mock).mockRejectedValue(new Error("Salt error"));

      await expect(bcryptProvider.hash(data)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("compare", () => {
    it("should return true if data matches the hash", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await bcryptProvider.compare(data, encrypted); // Remove the extra argument

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should return false if data does not match the hash", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await bcryptProvider.compare(data, encrypted); // Remove the extra argument

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should throw an InternalServerErrorException on error", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison error")
      );

      await expect(
        bcryptProvider.compare(data, encrypted) // Remove the extra argument
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
