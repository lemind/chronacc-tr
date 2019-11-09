
export default class Project {
  constructor(initial){
    this.name = ''
    this.color = ''

    Object.assign(this, initial)
  }
}
