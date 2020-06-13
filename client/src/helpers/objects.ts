import values from 'lodash/values'

export function isObjectEmpty(object: Object): boolean {
  return !values(object).some(x => x !== undefined)
}
