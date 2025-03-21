import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty() @Column({ name: '作成日時', default: () => 'now()' })
  作成日時?: Date;

  @ApiProperty() @Column({ name: '更新日時', default: () => 'now()' })
  更新日時?: Date;

  @ApiProperty() @Column({ name: '作成者ID', default: '' })
  作成者ID?: string | null = null;

  @ApiProperty() @Column({ name: '更新者ID', default: '' })
  更新者ID?: string | null = null;
}
