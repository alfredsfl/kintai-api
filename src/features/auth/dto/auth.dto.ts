import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/BaseDto';

export class AuthReq {
  @ApiProperty()
  @IsNotEmpty()
  ユーザ名: string;

  @ApiProperty()
  パスワード: string;
}

export class AuthRes extends BaseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  ユーザID: string;

  @ApiProperty()
  ユーザ名: string;

}
