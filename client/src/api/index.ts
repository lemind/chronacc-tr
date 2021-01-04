import { tasksAPI } from './tasks'
import { projectsAPI } from './projects'
import { authAPI } from './auth'

export type TBackDataVersion = {
  _v: number
}
export type TBackDataError = {
  id: number,
  message: string
}

export const API = {
  ...tasksAPI,
  ...projectsAPI,
  ...authAPI,
}
