import { ApiProperty } from '@nestjs/swagger';
import { Messages } from 'src/messages/Messages';
import { APP_CODE } from 'src/constants';

export class ErrorDto {
  @ApiProperty({ description: 'アプリケーションステータスコード', enum: APP_CODE }) code: string;
  @ApiProperty({ description: 'エラーメッセージ', type: [Messages] }) messageList: Array<Messages>;
  @ApiProperty({ description: 'リクエストID', nullable: true, required: false }) traceId: string;

  constructor() {
    this.code = ''
    this.messageList = []
    this.traceId = ''
  }
}