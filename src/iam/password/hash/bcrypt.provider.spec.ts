import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { BcryptProvider } from "./bcrypt.provider";

jest.mock("bcrypt");

describe("BcryptProvider", () => {
  let bcryptProvider: BcryptProvider;
  const mockConfigService = { get: jest.fn() };

  beforeEach(() => {
    mockConfigService.get.mockReturnValue(10); // Mocking SALT_ROUND to 10
    bcryptProvider = new BcryptProvider(mockConfigService as any);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("hash", () => {
    it("should hash the data successfully", async () => {
      const data = "password123";
      const hashedValue = "hashed_value";

      (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt"); // Mock salt generation
      (bcrypt.hashSync as jest.Mock).mockReturnValue(hashedValue); // Mock hashing

      const result = await bcryptProvider.hash(data);

      expect(result).toEqual(hashedValue);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(data, "salt");
    });

    it("should throw an InternalServerErrorException on error", async () => {
      const data = "password123";

      (bcrypt.genSalt as jest.Mock).mockRejectedValue(new Error("Salt error")); // Simulate an error

      await expect(bcryptProvider.hash(data)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("compare", () => {
    it("should return true if data matches the hash", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mock comparison to return true

      const result = await bcryptProvider.compare(data, encrypted, encrypted);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should return false if data does not match the hash", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock comparison to return false

      const result = await bcryptProvider.compare(data, encrypted, encrypted);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
    });

    it("should throw an InternalServerErrorException on error", async () => {
      const data = "password123";
      const encrypted = "hashed_value";

      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error("Comparison error")
      ); // Simulate an error

      await expect(
        bcryptProvider.compare(data, encrypted, encrypted)
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
