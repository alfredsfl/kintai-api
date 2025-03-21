import { ulid } from 'ulid'
import _ = require('lodash');
import crypto = require('crypto')
import { IdType } from 'src/constants';

export const BufferToString = (obj: any) => {
  const res = {}
  _.forEach(obj, (v, k) => {
    if (Buffer.isBuffer(v)) {
      res[k] = v.toString('base64')
    } else {
      res[k] = v
    }
  })
  return res
}
export const getId = (type: IdType) => {
  return type + ulid()
}
export const getHash = (password: string, id: string) => {
  return crypto.createHmac('SHA256', password).update(id).digest('base64');
}
export const pushArray = (target: any, val: any) => {
  if (!Array.isArray(target)) {
    target = []
  }
  if (_.isArray(val)) {
    target = target.concat(val)
  } else {
    target.push(val)
  }
  return target
}
export const ObjectToString = (obj: any) => {
  const res = {}
  _.forEach(obj, (v, k) => {
    if (Buffer.isBuffer(v)) {
      res[k] = { img: v.toString('base64') }
    } else if (v instanceof Date) {
      const yyyy = v.getFullYear()
      const mm = String(v.getMonth() + 1).padStart(2, '0')
      const dd = String(v.getDate()).padStart(2, '0')
      res[k] = `${yyyy}/${mm}/${dd}`
    } else {
      res[k] = v
    }
  })
  return res
}

/**
 * 正の整数チェック.
 * @param input チェック文字列.
 * @returns true:正の整数である、false：正の整数でない.
 */
export const isPositiveInteger = (input: string) => {
  // チェック条件パターン
  const regex = /^\d+$/;
  // 数値チェック
  return regex.test(input);
}

// TABを半角スペースに置き換える
export const replaceTabWithSpace = (value: string) => {
  return value.replace(/\t/g, ' ');
}

