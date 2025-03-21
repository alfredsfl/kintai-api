import { Mユーザ } from '../entities/Mユーザ.entity';

export type JWTPayload = {
  ユーザID: Mユーザ['ユーザID'];
  ユーザ名: Mユーザ['ユーザ名'];
};
