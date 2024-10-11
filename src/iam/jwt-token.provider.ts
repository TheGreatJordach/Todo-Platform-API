import {
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ActiveUserData } from "./interface/active-user-data.interface";
import { User } from "../users/entity/user-entity";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "./jwt/jwt.config";
import { ConfigType } from "@nestjs/config";
import { UserService } from "../users/managment/user.service";

@Injectable()
export class JwtTokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  private async signToken<T>(
    userID: number,
    expiresIn: number,
    payload?: T
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userID,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      }
    );
  }

  async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      ),
      this.signToken(user.id, this.jwtConfiguration.accessTokenTtl),
    ]);
    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub">
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user: User = await this.userService.findUserById(sub);
      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
