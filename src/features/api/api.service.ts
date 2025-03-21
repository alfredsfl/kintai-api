import { Inject, Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { BaseService } from "src/common/BaseService";
import { LoginRequestDto } from "./dto/login/login.request.dto";
import { LoginResponseDto } from "./dto/login/login.response.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ApiService extends BaseService {
    @Inject(ClsService)
    private readonly clsService: ClsService;

    constructor(
        private readonly authService: AuthService,
    ) {
        super(ApiService.name);
    }

    async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.authService.login(dto);
      }
      
}