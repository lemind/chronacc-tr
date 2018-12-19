import moment from 'moment'

let inst = 0
const getTaskId = () => {
  inst++;
  return inst
}

export default class Task {
  constructor(initial) {
    this.id = getTaskId()
    this.beginTime = null // current period
    this._isActive = false
    this.description = ''
    this.periods = []

    Object.assign(this, initial)
  }

  isActive(){
    return this._isActive
  }

  hasStartedToday(){
    const startTaskTime = moment(this.periods[0].beginTime)
    const diff = moment().diff(startTaskTime, 'days')

    return diff === 0
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