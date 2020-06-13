import { IMongoId, TColor } from "./index"

export interface IProject {
  _id: IMongoId
  name: string
  color?: TColor
  isNew?: boolean;
}

export default class Project implements IProject {
  name: string = ''
  color?: TColor = ''
  _id: IMongoId
  isNew?: boolean
  constructor(initial?: IProject) {
    Object.assign(this, initial)
  }
}
