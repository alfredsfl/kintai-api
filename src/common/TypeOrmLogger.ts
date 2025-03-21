import { Logger as Logger_ } from '@nestjs/common';
import { Logger, Logger as TypeOrmLogger, QueryRunner } from 'typeorm';

export class TypeOrmLoggerContainer implements Logger {
  private logger?: Logger_;

  constructor() {
    this.logger = new Logger_();
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.log(query);
    this.logger.log(parameters);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {
    if (level === 'log') {
      this.logger.log(message);
    } else if (level === 'info') {
      this.logger.log(message);
    } else if (level === 'warn') {
      this.logger.warn(message);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(message);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.logger.error(query);
    this.logger.error(parameters);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.logger.warn(query);
    this.logger.warn(parameters);
    this.logger.warn(`execution time: ` + time)
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(message);
  }
}
