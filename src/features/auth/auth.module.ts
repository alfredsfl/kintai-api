import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mユーザ } from "./entities/Mユーザ.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthConfig } from "./auth.config";
import { BrRepository } from "src/common/BrRepository";
import { AccessTokenStrategy } from "./token/accessToken.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({}),
        TypeOrmModule.forFeature([Mユーザ]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthConfig,
        AccessTokenStrategy,
        BrRepository,
    ],
    exports: [
        AuthService
      ]
})
export class AuthModule { }