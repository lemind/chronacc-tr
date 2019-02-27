import { ajax } from 'rxjs/observable/dom/ajax'
import { API_HOST, HEADERS } from '../config'

export const projectsAPI = {
  fetchProjects: () => {
    return ajax.getJSON(`${API_HOST}/projects`);
  },
  addProject: (action) => {
    return ajax.post(
      `${API_HOST}/project`,
      action.project,
      HEADERS
    )
  },
  updateProject: (action) => {
    return ajax.put(
      `${API_HOST}/project`,
      action.project,
      HEADERS
    )
  },
  deleteProject: (action) => {
    return ajax.delete(
      `${API_HOST}/project/${ action.projectId }`,
      HEADERS
    )
  },

}
