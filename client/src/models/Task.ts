import { format, dateTime, valueOf, TMoment } from 'helpers/dateTime'
import { IMongoId } from "./index"
import { IProject } from './Project'

type TPeriod = {
  beginTime: number
  endTime: number
}

export interface ITask {
  _id: IMongoId
  beginTime: number // current period
  _isActive: boolean
  description: string
  periods: TPeriod[]
  project: IProject | null
  hasStartedToday(): boolean
  start(): void
  stop(): void
  isActive: boolean
  startDay: string
  summTime: number
  startTime: number
}

export type TInitTask = {
  description?: string
  project?: IProject | null
}

export default class Task implements ITask {
  _id: IMongoId = '0'
  beginTime: number = 0
  _isActive: boolean = false
  description: string = ''
  periods: TPeriod[] = []
  project: IProject | null


  constructor(initial?: TInitTask) {
    Object.assign(this, initial)
  }

  get isActive(): boolean {
    return !!this.beginTime
  }

  get startDay(): string {
    if (!this.periods[0] || !this.periods[0].beginTime) return ''
    const startTaskTime = dateTime(this.periods[0].beginTime)
    return format(startTaskTime, 'DD/MM')
  }

  hasStartedToday(): boolean {
    const startTaskTime = dateTime(this.periods[0].beginTime)
    const targetDay = format(startTaskTime, 'DD')
    const today = format(null, 'DD')

    return targetDay === today
  }

  start(): void {
    this.beginTime = valueOf()
    this._isActive = true
  }

  stop(): void {
    this._isActive = false
    this.periods.push({
      beginTime: this.beginTime,
      endTime: valueOf()
    })
    this.beginTime = 0
  }

  get summTime(): number {
    let summTime = 0

    if (this.periods.length) {
      summTime = this.periods.reduce((acc, item) => {
        acc = acc + (item.endTime - item.beginTime)
        return acc
      }, summTime)
    }

    if (!summTime) {
      return 0
    }

    return summTime
  }

  get startTime(): number {
    const summTime = this.summTime
    let startTime = summTime ? summTime : 0

    return this.beginTime - startTime
  }
}
