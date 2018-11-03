import dayjs from 'dayjs'
import camelCase from 'lodash/camelCase'

let inst = 0
const getTaskId = () => {
  inst++;
  return inst
}

export default class Task {
  constructor(initial) {
    this.id = getTaskId()
    this.beginTime = ''
    this.isActive = false
    this.periods = []

    Object.assign(this, camelCase(initial))
  }

  start() {
    this.beginTime = dayjs().valueOf() //ToDo: wrap dayjs
    this.isActive = true
  }

  stop() {
    this.isActive = false
    this.periods.push({
      beginTime: this.beginTime,
      endTime: dayjs().valueOf()
    })
  }
}