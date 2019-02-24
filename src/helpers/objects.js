import _ from 'lodash'

export function isObjectEmpty(object) {
  return !_.values(object).some(x => x !== undefined)
}
