import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthReq, AuthRes } from "./dto/auth.dto";

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post('login')
    @ApiOkResponse({ type: AuthRes })
    async login(@Body() authReq: AuthReq): Promise<AuthRes> {
        return await this.authService.login(authReq);
    }
}