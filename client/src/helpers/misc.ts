import { IMongoId } from "models/index"

export function isFunction(fn: Function): boolean {
  return (typeof fn === 'function')
}

const DIGITS_SHOW_FROM_ID = 5
export function getShortId(id: IMongoId): IMongoId {
  return '...' + id.substr(id.length - DIGITS_SHOW_FROM_ID)
}
