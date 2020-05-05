import { IMongoId } from "./index"

export interface IProject {
  _id: IMongoId
  name: string
  color: string
}

export default class Project implements IProject {
  name: string = ''
  color: string = ''
  _id: IMongoId
  constructor(initial?: IProject) {
    Object.assign(this, initial)
  }
}
