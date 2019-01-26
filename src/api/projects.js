import { ajax } from 'rxjs/observable/dom/ajax';
import { API_HOST } from '../config';

export const projectsAPI = {
  fetchProjects: () => {
    return ajax.getJSON(`${API_HOST}/projects`);
  },
  addProject: (action) => {
    return ajax.post(
      `${API_HOST}/project`,
      action.task,
      { 'Content-Type': 'application/json' }
    );
  },
  updateProject: (action) => {
    return ajax.put(
      `${API_HOST}/project`,
      action.task,
      { 'Content-Type': 'application/json' }
    );
  },
  deleteProject: (action) => {
    return ajax.delete(
      `${API_HOST}/project/${ action.projectId }`,
      { 'Content-Type': 'application/json' }
    );
  },

}
