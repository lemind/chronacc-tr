import dayjs from 'dayjs'
import moment from 'moment'
import camelCase from 'lodash/camelCase'

let inst = 0
const getTaskId = () => {
  inst++;
  return inst
}

export default class Task {
  constructor(initial) {
    this.id = getTaskId()
    this.beginTime = null
    this.isActive = false
    this.periods = []

    Object.assign(this, camelCase(initial))
  }

  start() {
    this.beginTime = moment().valueOf() //ToDo: wrap moment
    this.isActive = true
  }

  stop() {
    this.isActive = false
    this.periods.push({
      beginTime: this.beginTime,
      endTime: moment().valueOf()
    })
    this.beginTime = null
  }
}