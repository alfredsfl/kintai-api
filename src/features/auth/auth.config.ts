import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public jwtSecretKey: string = process.env.JWT_SECRET_KEY;
  public expiresInAccessToken: string = process.env.JWT_ACCESS_TOKEN_EFFECTIVE_TIME;
  public expiresInRefreshToken: string = process.env.JWT_REFRESH_TOKEN_EFFECTIVE_TIME;
}
