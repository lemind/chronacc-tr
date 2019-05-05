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

export function diff(time, measurement) {
  return moment().diff(moment(time), measurement)
}

export function utcFormat(time, format) {
  return moment(time).utc().format(format)
}

export function duration(value, unit) {
  return moment.duration(value, unit)
}
