import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource, EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import _ = require('lodash')
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { SqlServerDriver } from 'typeorm/driver/sqlserver/SqlServerDriver';
import { BaseRepository } from './BaseRepository';

@Injectable({ scope: Scope.REQUEST })
export class BrRepository extends BaseRepository {

  private manager: EntityManager = null
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  setManager(_manager: EntityManager) {
    this.manager = _manager
  }

  async count<T>(entityCls: new () => T, dto?: FindOneOptions<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).count(dto)
    : await this.getRepository(entityCls).count(dto)
  }
  async findOne<T>(entityCls: new () => T, dto: FindOneOptions<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).findOne(dto)
    : await this.getRepository(entityCls).findOne(dto)
  }
  async find<T>(entityCls: new () => T, dto?: FindManyOptions<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).find(dto)
    : await this.getRepository(entityCls).find(dto)
  }
  async findOneForUpdate<T>(entityCls: new () => T, where: string, options?: ObjectLiteral) {
    return this.manager
    ? await this.manager.getRepository(entityCls).createQueryBuilder().setLock('pessimistic_write').useTransaction(true).where(where, options).getOne()
    : await this.getRepository(entityCls).createQueryBuilder().setLock('pessimistic_write').useTransaction(true).where(where, options).getOne()
  }
  async findForUpdate<T>(entityCls: new () => T, where: FindOptionsWhere<T>, options?: ObjectLiteral) {
    return this.manager
    ? await this.manager.getRepository(entityCls).createQueryBuilder().setLock('pessimistic_write').useTransaction(true).where(where, options).getMany()
    : await this.getRepository(entityCls).createQueryBuilder().setLock('pessimistic_write').useTransaction(true).where(where, options).getMany()
  }
  async save<T>(entityCls: new () => T, list: Array<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).save(list)
    : await this.getRepository(entityCls).save(list)
  }
  async remove<T>(entityCls: new () => T, list: Array<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).remove(list)
    : await this.getRepository(entityCls).remove(list)
  }
  async update<T>(entityCls: new () => T, dto: FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).update(dto, partialEntity)
    : await this.getRepository(entityCls).update(dto, partialEntity)
  }
  async delete<T>(entityCls: new () => T, dto: FindOptionsWhere<T>) {
    return this.manager
    ? await this.manager.getRepository(entityCls).delete(dto)
    : await this.getRepository(entityCls).delete(dto)
  }
  async execute(sqlText: string, value?: any) {
    return this.manager
      ? await this.manager.query(sqlText, value)
      : await this.getManager().query(sqlText, value)
  }
  async executeProcedure(command: string, input: Array<{id: string, value: any}>, output: Array<string>) {
    const executeCommand = this.manager
    ? await (this.manager.connection.driver as SqlServerDriver).master.request()
    : await this.getDriver().master.request()

    _.forEach(input, r => {
      executeCommand.input(r.id, r.value)
    })
    _.forEach(output, r => {
      executeCommand.output(r)
    })
    
    return executeCommand.execute(command)
  }
  createQueryBuilder<T>(entityCls: new () => T, alias: string) {
    return this.manager
    ? this.manager.getRepository(entityCls).createQueryBuilder(alias)
    : this.getRepository(entityCls).createQueryBuilder(alias)
  }
}