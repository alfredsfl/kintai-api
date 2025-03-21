import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/login/login.response.dto";
import { LoginRequestDto } from "./dto/login/login.request.dto";
import { ErrorDto } from "./dto/error.dto";
import { ApiService } from "./api.service";

@ApiTags('public/api')
@Controller('public/api')
export class ApiController {
    constructor(
        private readonly apiService: ApiService
    ) { }

    @Post('login')
    @ApiOperation({ description: 'ログインを行いJWTを取得する' })
    @ApiCreatedResponse({ description: 'OK Response', type: LoginResponseDto })
    @ApiInternalServerErrorResponse({ description: 'Error Response', type: ErrorDto })
    async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.apiService.login(dto);
    }
}