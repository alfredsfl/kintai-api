import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/BaseService";
import { AuthReq, AuthRes } from "./dto/auth.dto";
import * as dayjs from 'dayjs';
import { Mユーザ } from "./entities/Mユーザ.entity";
import { BusinessException } from "src/common/BusinessException";
import { Messages } from "src/messages/Messages";
import { APP_CODE } from "src/constants";
import { JwtService } from '@nestjs/jwt';
import { AuthConfig } from "./auth.config";
import { BrRepository } from "src/common/BrRepository";
import { getHash } from "../utils/CommonUtils";
import { JWTPayload } from "./types/JWTPayload.type";

@Injectable()
export class AuthService extends BaseService {
    constructor(
        private jwtService: JwtService,
        private authConfig: AuthConfig,
        private brRepository: BrRepository,
    ) {
        super(AuthService.name);
    }
    async validateUser(
        name: Mユーザ['ユーザ名'],
        pass: Mユーザ['パスワード'],
    ): Promise<AuthRes> {
        const user = await this.brRepository.findOne(Mユーザ, {
            where: { ユーザ名: name },
        });
        const res = new AuthRes();
        if (!user) {
            this.logger.warn('No User');
            throw new BusinessException(Messages.EC00005, APP_CODE.AuthenticationError);
        } else {
            this.logger.warn('User');
            if (user.パスワード !== getHash(pass, name)) {
                throw new BusinessException(Messages.EC00005, APP_CODE.AuthenticationError);
            } else {
                res.ユーザID = user.ユーザID;
                res.ユーザ名 = user.ユーザ名;
            }
            return res;
        }
    }

    async validateUserPc(
        name: Mユーザ['ユーザ名'],
        cpass: Mユーザ['パスワード'],
    ): Promise<AuthRes> {
        const user = await this.brRepository.findOne(Mユーザ, {
            where: { ユーザ名: name },
        });
        const res = new AuthRes();
        if (!user) {
            this.logger.warn('No User');
            throw new BusinessException(Messages.EC00006, APP_CODE.AuthenticationError);
        } else {
            this.logger.warn('User');
            if (user.パスワード !== getHash(cpass, name)) {
                throw new BusinessException(Messages.EC00007, APP_CODE.AuthenticationError);
            } else {
                res.ユーザID = user.ユーザID;
                res.ユーザ名 = user.ユーザ名;
            }
        }
        return res;
    }

    async getAccessToken(user: AuthRes): Promise<string> {
        const payload: JWTPayload = {
            ユーザID: user.ユーザID,
            ユーザ名: user.ユーザ名
        };
        return user.code === APP_CODE.NonError
            ? this.jwtService.sign(payload, {
                secret: this.authConfig.jwtSecretKey,
                expiresIn: this.authConfig.expiresInAccessToken,
            })
            : null;
    }
    async login(authReq: AuthReq): Promise<AuthRes> {
        const username = authReq.ユーザ名;
        const password = authReq.パスワード;
        const user = await this.validateUser(username, password);
        const accessToken = await this.getAccessToken(user);
        return {
            ...user,
            accessToken: accessToken,
            selDate: dayjs().toDate(),
        };
    }

}