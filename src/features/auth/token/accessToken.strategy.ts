import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfig } from '../auth.config';
import { ClsService } from 'nestjs-cls';
import { JWTPayload } from '../types/JWTPayload.type';

/**
 * @description AccessTokenの認証処理を行うクラス
 */
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(BaseJwtStrategy) {
    @Inject()
    private readonly clsService: ClsService;

    constructor(private readonly authConfig: AuthConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfig.jwtSecretKey,
        });
    }

    async validate(payload: JWTPayload): Promise<JWTPayload> {
        const userInfo: JWTPayload = {
            ユーザID: payload.ユーザID,
            ユーザ名: payload.ユーザ名,
            //   姓: payload.姓,
            //   名: payload.名,
        };
        this.clsService.set('user', userInfo);
        return userInfo;
    }
}
