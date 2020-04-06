import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { ProjectActionType } from 'src/redux/projects';

type ResonseType = any

export const projectsAPI = {
  fetchProjects: () => {
    return ajax.getJSON<ResonseType>(`${API_HOST}/projects`);
  },
  createProject: (action: ProjectActionType) => {
    return ajax.post(
      `${API_HOST}/project`,
      action.payload,
      HEADERS
    )
  },
  updateProject: (action: ProjectActionType) => {
    return ajax.put(
      `${API_HOST}/project`,
      action.payload,
      HEADERS
    )
  },
  deleteProject: (action: ProjectActionType) => {
    return ajax.delete(
      `${API_HOST}/project/${ action.payload }`,
      HEADERS
    )
  },

}
