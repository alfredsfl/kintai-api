import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
import { APP_CODE } from 'src/constants';
import { Messages } from 'src/messages/Messages';
import { BusinessException } from './BusinessException';
  
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
    logger: Logger = new Logger(AllExceptionFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();
  
      this.logger.error(exception);
  
      const status =
        exception instanceof BusinessException
          ? exception.code === APP_CODE.AuthorityError?HttpStatus.FORBIDDEN :HttpStatus.OK
          : exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const code =
        exception instanceof BusinessException
          ? exception.code
          : APP_CODE.SystemError;
  
      const messageList = 
        exception instanceof BusinessException
          ? [exception.errorMessage]
          : [Messages.EC09999.getMessage((exception as any).message)];
  
      const body = { code: code, messageList: messageList, traceId: request.id };
      this.logger.error(body);
  
      response.status(status).send(body);
    }
  }
  