import { ajax } from 'rxjs/observable/dom/ajax';
import { API_HOST } from '../config';

export const tasksAPI = {
  fetchTasks: () => {
    return ajax.getJSON(`${API_HOST}/tasks`);
  },

};
