import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { ProjectActionType } from 'src/redux/projects';
import { IProject } from 'models/Project';

// ToDo move to api/index
export type TBackDataVersion = {
  _v: number
}
export type TBackDataError = {
  id: number,
  message: string
}


type TProjectRaw = IProject & TBackDataVersion

type TResponse = {
  result: TProjectRaw[], // not required
  error: TBackDataError, // not required
  success: boolean
}

export const projectsAPI = {
  fetchProjects: () => {
    return ajax.getJSON<TResponse>(`${API_HOST}/projects`);
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
