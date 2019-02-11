import { tasksAPI } from './tasks'
import { projectsAPI } from './projects'

export const API = {
  ...tasksAPI,
  ...projectsAPI
}
