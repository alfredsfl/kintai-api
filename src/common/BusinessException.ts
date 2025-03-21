import { HttpException, HttpStatus } from '@nestjs/common';
import { APP_CODE } from 'src/constants';
import { Messages } from 'src/messages/Messages';

export class BusinessException extends HttpException {
  private _code?: string;
  private params: any[];

  constructor(private _message: Messages, code?: string, ...params: any[]) {
    super({}, HttpStatus.INTERNAL_SERVER_ERROR);
    this._code = code ?? APP_CODE.SystemError;
    this.params = params;
  }

  get code(): string {
    return this._code;
  }

  get errorMessage(): Messages {
    return this._message.getMessage(...this.params);
  }
}
