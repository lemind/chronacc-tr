import { tasksAPI } from './tasks'
import { projectsAPI } from './projects'

export type TBackDataVersion = {
  _v: number
}
export type TBackDataError = {
  id: number,
  message: string
}

export const API = {
  ...tasksAPI,
  ...projectsAPI
}
