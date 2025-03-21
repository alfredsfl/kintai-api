import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { BrRepository } from "src/common/BrRepository";

@Module({
    imports: [
        AuthModule
    ],
    controllers: [ApiController],
    providers: [ApiService, BrRepository],
})
export class ApiModule {}