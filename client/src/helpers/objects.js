import values from 'lodash/values'

export function isObjectEmpty(object) {
  return !values(object).some(x => x !== undefined)
}
