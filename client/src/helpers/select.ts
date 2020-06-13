import { IMongoId } from "models/index"

type TInputData = {
  _id: IMongoId,
  name: string
}

type TOutputSelectData = {
  value: string,
  label: string
}

export function makeOptionFromItem(item: TInputData): TOutputSelectData {
  return {
    value: item._id,
    label: item.name
  }
}
