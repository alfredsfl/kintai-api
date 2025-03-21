import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { APP_CODE } from 'src/constants';
import { Messages } from 'src/messages/Messages';

export class BaseDto {
  @ApiProperty({ description: 'アプリケーションステータスコード', enum: APP_CODE })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'エラーメッセージ', type: [Messages] })
  messageList: Array<Messages>;

  @ApiProperty({ description: '取得日時', nullable: true })
  selDate: Date | null;

  constructor() {
    this.code = APP_CODE.NonError;
    this.messageList = [];
    this.selDate = null;
  }
}
