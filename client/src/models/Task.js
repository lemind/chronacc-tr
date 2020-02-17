import { format, dateTime, valueOf } from 'helpers/dateTime'

export default class Task {
  constructor(initial) {
    this._id = 0
    this.beginTime = null // current period
    this._isActive = false
    this.description = ''
    this.periods = []
    this.project = null

    Object.assign(this, initial)
  }

  isActive() {
    return !!this.beginTime
  }

  dayStart() {
    if (!this.periods[0] || !this.periods[0].beginTime) return null
    const startTaskTime = dateTime(this.periods[0].beginTime)
    return format(startTaskTime, 'DD/MM')
  }

  hasStartedToday() {
    const startTaskTime = dateTime(this.periods[0].beginTime)
    const targetDay = format(startTaskTime, 'DD')
    const today = format(null, 'DD')

    return targetDay === today
  }

  start() {
    this.beginTime = valueOf()
    this._isActive = true
  }

  stop(){
    this._isActive = false
    this.periods.push({
      beginTime: this.beginTime,
      endTime: valueOf()
    })
    this.beginTime = null
  }

  get summTime() {
    let summTime = 0

    if (this.periods.length) {
      summTime = this.periods.reduce((acc, item) => {
        acc = acc + (item.endTime - item.beginTime)
        return acc
      }, summTime)
    }

    if (!summTime) {
      return null
    }

    return summTime
  }

  get startTime() {
    const summTime = this.summTime
    let startTime = summTime ? summTime : 0

    return this.beginTime - startTime
  }
}
