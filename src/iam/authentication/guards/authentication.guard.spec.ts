import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthenticationGuard } from "./authentication.guard";
import { AccessTokenGuard } from "./access-token/access-token.guard";
import { AuthType } from "../enums/auth-type.enum";

// Mock AccessTokenGuard
const mockAccessTokenGuard: CanActivate = {
  canActivate: jest.fn(),
};

// Mock Reflector
const mockReflector = {
  getAllAndOverride: jest.fn(),
};

describe("AuthenticationGuard", () => {
  let authenticationGuard: AuthenticationGuard;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    authenticationGuard = new AuthenticationGuard(
      mockReflector as unknown as Reflector,
      mockAccessTokenGuard as unknown as AccessTokenGuard
    );

    // Mock ExecutionContext with getHandler and getClass
    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({}),
      }),
      getHandler: jest.fn().mockReturnValue(() => {}),
      getClass: jest.fn().mockReturnValue(() => {}),
    } as unknown as ExecutionContext;
  });

  describe("canActivate", () => {
    it("should return true if AccessTokenGuard allows access", async () => {
      // Mock Reflector to return Bearer AuthType
      mockReflector.getAllAndOverride.mockReturnValue([AuthType.Bearer]);

      // Mock AccessTokenGuard to allow access
      (mockAccessTokenGuard.canActivate as jest.Mock).mockResolvedValue(true);

      const result =
        await authenticationGuard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockAccessTokenGuard.canActivate).toHaveBeenCalledWith(
        mockExecutionContext
      );
    });

    it("should return true if AuthType.None is set (no guard required)", async () => {
      // Reset the mock state
      jest.clearAllMocks();

      // Mock Reflector to return None AuthType
      mockReflector.getAllAndOverride.mockReturnValue([AuthType.None]);

      const result =
        await authenticationGuard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      // Ensure AccessTokenGuard was NOT called
      expect(mockAccessTokenGuard.canActivate).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException if no guard allows access", async () => {
      // Mock Reflector to return Bearer AuthType
      mockReflector.getAllAndOverride.mockReturnValue([AuthType.Bearer]);

      // Mock AccessTokenGuard to deny access
      (mockAccessTokenGuard.canActivate as jest.Mock).mockResolvedValue(false);

      await expect(
        authenticationGuard.canActivate(mockExecutionContext)
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should use default AuthType.Bearer if no auth type is defined", async () => {
      // Mock Reflector to return no auth type (undefined)
      mockReflector.getAllAndOverride.mockReturnValue(undefined);

      // Mock AccessTokenGuard to allow access
      (mockAccessTokenGuard.canActivate as jest.Mock).mockResolvedValue(true);

      const result =
        await authenticationGuard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockAccessTokenGuard.canActivate).toHaveBeenCalledWith(
        mockExecutionContext
      );
    });

    it("should catch and throw errors from guards", async () => {
      // Mock Reflector to return Bearer AuthType
      mockReflector.getAllAndOverride.mockReturnValue([AuthType.Bearer]);

      // Mock AccessTokenGuard to throw an error
      const guardError = new UnauthorizedException("Invalid token");
      (mockAccessTokenGuard.canActivate as jest.Mock).mockRejectedValue(
        guardError
      );

      await expect(
        authenticationGuard.canActivate(mockExecutionContext)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
