import formatMessage = require('format-message');
import { ApiProperty } from '@nestjs/swagger';

export class Messages {
    static EC09999 = new Messages('EC09999', '予期しないエラーが発生しました。{0}', 'E');
    static EC00005 = new Messages('EC00005', '認証に失敗しました。', 'E');
    static EC00006 = new Messages('EC00006', '未登録のユーザです。パスワード変更できません。', 'E');
    static EC00007 = new Messages('EC00007', '古いパスワードが正しくありません。', 'E');
    
    @ApiProperty({ description: 'メッセージコード' }) code: string = '';
    @ApiProperty({ description: 'メッセージ本文' }) message: string = '';
    @ApiProperty({ description: 'メッセージタイプ' }) type: string = ''
  
    private constructor(code: string, message: string, type: string) {
      this.code = code;
      this.message = message;
      this.type = type;
    }
  
    public getMessage(...params: any[]): Messages | null {
      const messageObject = Object.assign({}, Messages[this.code]);
      if (params !== null && params !== undefined) {
        messageObject.message = formatMessage(messageObject.message, params)
      }
      return messageObject;
    }
  
    public getMessageText(...params: any[]): string {
      return formatMessage(Messages[this.code].message, params)
    }
  
}