import moment from 'moment'

export default class Task {
  constructor(initial) {
    this.id = 0
    this.beginTime = null // current period
    this._isActive = false
    this.description = ''
    this.periods = []

    Object.assign(this, initial)
  }

  isActive(){
    return !!this.beginTime
  }

  dayStart(){
    if (!this.periods[0] || !this.periods[0].beginTime) return null
    const startTaskTime = moment(this.periods[0].beginTime)
    return moment(startTaskTime).format('DD/MM')
  }

  hasStartedToday(){
    const startTaskTime = moment(this.periods[0].beginTime)
    const targetDay = moment(startTaskTime).format('DD')
    const today = moment().format('DD')

    return targetDay === today
  }

  start() {
    this.beginTime = moment().valueOf() //ToDo: wrap moment
    this._isActive = true
  }

  stop() {
    this._isActive = false
    this.periods.push({
      beginTime: this.beginTime,
      endTime: moment().valueOf()
    })
    this.beginTime = null
  }

  getSummTime(){
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

  getStartTime(){
    const summTime = this.getSummTime()
    let startTime = summTime ? summTime : 0

    return this.beginTime - startTime
  }
}