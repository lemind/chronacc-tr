
export interface IProject {
  _id: any
  name?: string
  color?: string
}

export default class Project implements IProject {
  name: string = ''
  color: string = ''
  _id: any
  constructor(initial? :IProject){
    Object.assign(this, initial)
  }
}
