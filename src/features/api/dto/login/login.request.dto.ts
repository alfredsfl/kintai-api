import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginRequestDto {
    @ApiProperty({ description: 'ユーザ名' })
    @IsNotEmpty()
    ユーザ名: string;

    @ApiProperty({ description: 'パスワード' })
    パスワード: string;
}