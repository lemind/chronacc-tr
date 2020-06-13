import { IMongoId } from "models/index"

export function isFunction(fn: Function): boolean {
  return (typeof fn === 'function')
}

const SHOWN_DIGITS_NUMBER_FROM_ID = 5
export function getShortId(id: IMongoId): IMongoId {
  return '...' + id.substr(id.length - SHOWN_DIGITS_NUMBER_FROM_ID)
}
