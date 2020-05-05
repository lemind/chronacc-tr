import moment, { Moment, unitOfTime } from 'moment'

export const TIME_FORMAT: string = 'HH:mm:ss'

type TMomentUnit = "day" | "days" | "year" | "years" | "y" | "month"
  | "months" | "M" | "week" | "weeks" | "w" | "day" | "days"
  | "d" | "hour" | "hours" | "h" | "minute" | "minutes" | "m"
  | "second" | "seconds" | "s"

export type TMoment = Moment | number

export function dateTime(...params: any): Moment {
  return moment(...params)
}

export function valueOf(): number {
  return moment().valueOf()
}

export function format(time: TMoment | null, format: string): string {
  if (!time) {
    return moment().format(format)  
  }
  return moment(time).format(format)
}

export function diff(time: TMoment, measurement: unitOfTime.Diff): number {
  return moment().diff(moment(time), measurement)
}

export function utcFormat(time: TMoment, format: string): string {
  return moment(time).utc().format(format)
}

export function duration(value: number, unit: TMomentUnit): moment.Duration {
  return moment.duration(value, unit)
}
