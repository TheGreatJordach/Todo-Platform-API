import { UnauthorizedException } from "@nestjs/common";
import { AccessTokenGuard } from "./access-token.guard";

import { ExecutionContext } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../../../jwt/jwt.config";
import { Request } from "express";
import { REQUEST_USER_KEY } from "../../../constant/user.constant";

// Mock JwtService and ConfigType
const mockJwtService = {
  verifyAsync: jest.fn(),
};

const mockJwtConfig: ConfigType<typeof jwtConfig> = {
  secret: "testSecret",
  audience: "http://localhost:3000/",
  issuer: "http://localhost:3000/",
  accessTokenTtl: 3600,
  refreshTokenTtl: 8400,
};

describe("AccessTokenGuard", () => {
  let guard: AccessTokenGuard;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    guard = new AccessTokenGuard(mockJwtService as any, mockJwtConfig);

    // Mock ExecutionContext and Request
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;
  });

  describe("canActivate", () => {
    it("should return true if the token is valid", async () => {
      const mockRequest = { headers: { authorization: "Bearer validToken" } };
      (
        mockExecutionContext.switchToHttp().getRequest as jest.Mock
      ).mockReturnValue(mockRequest);

      // Mock verifyAsync to return a valid user object
      const userPayload = { id: 1, username: "testUser" };
      mockJwtService.verifyAsync.mockResolvedValue(userPayload);

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest[REQUEST_USER_KEY]).toEqual(userPayload);
    });

    it("should throw UnauthorizedException if no token is provided", async () => {
      const mockRequest = { headers: {} }; // No authorization header
      (
        mockExecutionContext.switchToHttp().getRequest as jest.Mock
      ).mockReturnValue(mockRequest);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it("should throw UnauthorizedException if token verification fails", async () => {
      const mockRequest = { headers: { authorization: "Bearer invalidToken" } };
      (
        mockExecutionContext.switchToHttp().getRequest as jest.Mock
      ).mockReturnValue(mockRequest);

      // Mock verifyAsync to throw an error
      mockJwtService.verifyAsync.mockRejectedValue(new Error("Invalid token"));

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
    });
  });

  describe("extractTokenFromHeader", () => {
    it("should extract the token from the Authorization header", () => {
      const mockRequest = {
        headers: { authorization: "Bearer someToken" },
      } as Request;
      const token = guard["extractTokenFromHeader"](mockRequest); // Access private method
      expect(token).toBe("someToken");
    });

    it("should return undefined if no Authorization header is present", () => {
      const mockRequest = { headers: {} } as Request;
      const token = guard["extractTokenFromHeader"](mockRequest);
      expect(token).toBeUndefined();
    });
  });
});
