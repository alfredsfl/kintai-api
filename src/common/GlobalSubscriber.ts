// TODO
import { Injectable, Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  Connection,
  OptimisticLockVersionMismatchError,
} from 'typeorm';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

@Injectable()
@EventSubscriber()
export class GlobalSubscriber implements EntitySubscriberInterface {
  protected logger?: Logger;

  constructor(
    private readonly connection: Connection,
    private readonly clsService: ClsService,
  ) {
    this.logger = new Logger();
    this.connection.subscribers.push(this);
  }

  beforeUpdate(event: UpdateEvent<any>) {
    console.group('-------------------------- before update --------------------------------')
    if (!event.databaseEntity) {
      return;
    }

    const userInfo = this.clsService.get('user');
    if (userInfo && userInfo.ユーザ名) {
      event.entity.更新者ID = userInfo.ユーザ名;
      event.entity.更新日時 = this.currentDate();
    }

    if (event.metadata.versionColumn && event.entity) {
      const versionFromUpdate = Reflect.get(
        event.entity,
        event.metadata.versionColumn.propertyName,
      );

      const versionFromDatabase =
        event.databaseEntity[event.metadata.versionColumn.propertyName];

      if (versionFromDatabase !== versionFromUpdate) {
        throw new OptimisticLockVersionMismatchError(
          event.entity as any,
          versionFromDatabase,
          versionFromUpdate,
        );
      }
    }
  }

  beforeInsert(event: UpdateEvent<any>) {
    console.group('-------------------------- before insert --------------------------------')
    const userInfo = this.clsService.get('user');
    if (event.entity) {
      event.entity.作成者ID = userInfo.ユーザ名;
      event.entity.更新者ID = userInfo.ユーザ名;
      event.entity.作成日時 = this.currentDate();
      event.entity.更新日時 = this.currentDate();
    }
    console.groupEnd()
  }

  currentDate() {
    dayjs.extend(timezone);
    dayjs.extend(utc);
    return dayjs().tz(process.env.TIME_ZONE).toDate();
  }
}
