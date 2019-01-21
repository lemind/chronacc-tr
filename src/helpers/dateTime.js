import moment from 'moment'

export function dateTime(param) {
  return moment(param)
}

export function valueOf() {
  return moment().valueOf()
}

export function format(time, format) {
  if (!time) {
    return moment().format(format)  
  }
  return moment(time).format(format)
}
