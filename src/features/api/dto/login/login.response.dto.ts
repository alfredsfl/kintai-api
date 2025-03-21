import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({ description: 'アクセストークン' })
    accessToken: string;

    @ApiProperty({ description: 'リフレッシュトークン', nullable: true, required: false })
    refreshToken: string;

    @ApiProperty({ description: 'ログインユーザ ユーザID' })
    ユーザID: string;

    @ApiProperty({ description: 'ログインユーザ ユーザ名' })
    ユーザ名: string;
}