
export interface IProject {
  name?: string
  color?: string
}

export default class Project implements IProject {
  name?: string = ''
  color?: string = ''
  constructor(initial? :IProject){
    Object.assign(this, initial)
  }
}
