import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/BaseEntity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('M_ユーザ')
export class Mユーザ extends BaseEntity {
    @ApiProperty() @PrimaryColumn('varchar', { name: 'ユーザID', length: 39 }) ユーザID: string;
    @ApiProperty() @Column('varchar', { name: 'ユーザ名', length: 128 }) ユーザ名: string;
    @ApiProperty() @Column('varchar', { name: 'パスワード', length: 128 }) パスワード: string | null = null;
    @ApiProperty() @Column('varchar', { name: '読み仮名', length: 256 }) 読み仮名: string | null = null;
    @ApiProperty() @Column('varchar', { name: 'メールアドレス', length: 256 }) メールアドレス: string | null = null;
    @ApiProperty() @Column('varchar', { name: '代表組織1', length: 256 }) 代表組織1: string | null = null;
    @ApiProperty() @Column('varchar', { name: '代表組織2', length: 256 }) 代表組織2: string | null = null;
    @ApiProperty() @Column('varchar', { name: '役職', length: 256 }) 役職: string | null = null;
    @ApiProperty() @Column('varchar', { name: '社員番号', length: 256 }) 社員番号: string | null = null;
    @ApiProperty() @Column('varchar', { name: '郵便番号', length: 256 }) 郵便番号: string | null = null;
    @ApiProperty() @Column('varchar', { name: '住所', length: 2048 }) 住所: string | null = null;
    @ApiProperty() @Column('varchar', { name: '電話番号', length: 256 }) 電話番号: string | null = null;
    @ApiProperty() @Column('varchar', { name: '備考', length: 2048 }) 備考: string | null = null;
}