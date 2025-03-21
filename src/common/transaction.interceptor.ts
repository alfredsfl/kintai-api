import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Logger } from '@nestjs/common/services';
  import { Request } from 'express';
  import { Observable, catchError, concatMap, finalize } from 'rxjs';
  import { DataSource } from 'typeorm';
  
  export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';
  
  @Injectable()
  export class TransactionInterceptor implements NestInterceptor {
    protected logger?: Logger;
    constructor(private dataSource: DataSource) {
      this.logger = new Logger('TransactionInterceptor');
    }
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      // get request object
      const req = context.switchToHttp().getRequest<Request>();
      // start transaction
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      // attach query manager with transaction to the request
      req[ENTITY_MANAGER_KEY] = queryRunner.manager;
  
      return next.handle().pipe(
        // concatMap gets called when route handler completes successfully
        concatMap(async (data) => {
          this.logger.debug('---------- commit! ----------')
          await queryRunner.commitTransaction();
          return data;
        }),
        // catchError gets called when route handler throws an exception
        catchError(async (e) => {
          this.logger.debug('---------- rollback! ----------')
          await queryRunner.rollbackTransaction();
          throw e;
        }),
        // always executed, even if catchError method throws an exception
        finalize(async () => {
          this.logger.debug('---------- release ----------')
          await queryRunner.release();
        }),
      );
    }
  }