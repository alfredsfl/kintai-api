import { Request } from 'express';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SqlServerDriver } from 'typeorm/driver/sqlserver/SqlServerDriver';
import { ENTITY_MANAGER_KEY } from './transaction.interceptor';

export class BaseRepository {
  constructor(private dataSource: DataSource, private request: Request) {}

  protected getRepository<T>(entityCls: new () => T): Repository<T> {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityCls);
  }
  protected getManager(): EntityManager {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager
  }
  protected getDriver(): SqlServerDriver {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.connection.driver as SqlServerDriver
  }
}