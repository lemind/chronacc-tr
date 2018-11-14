import dayjs from 'dayjs'
import moment from 'moment'

let inst = 0
const getTaskId = () => {
  inst++;
  return inst
}

export default class Task {
  constructor(initial) {
    this.id = getTaskId()
    this.beginTime = null
    this._isActive = false
    this.description = ''
    this.periods = []

    Object.assign(this, initial)
  }

  isActive(){
    return this._isActive
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
}