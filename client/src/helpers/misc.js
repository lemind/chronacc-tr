
export function isFunction(fn) {
  return (typeof fn === 'function')
}

const DIGITS_SHOW_FROM_ID = 5
export function getShortId(id) {
  return '...' + id.substr(id.length - DIGITS_SHOW_FROM_ID)
}