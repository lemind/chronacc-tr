import { ajax } from 'rxjs/observable/dom/ajax';
import { API_HOST } from '../config';

export const tasksAPI = {
  fetchTasks: () => {
    return ajax.getJSON(`${API_HOST}/tasks`);
  },
  addTask: (action) => {
    return ajax.post(
      `${API_HOST}/task`,
      action.task,
      { 'Content-Type': 'application/json' }
    );
  },
  updateTask: (action) => {
    return ajax.put(
      `${API_HOST}/task`,
      action.task,
      { 'Content-Type': 'application/json' }
    );
  },
  deleteTask: (action) => {
    return ajax.delete(
      `${API_HOST}/task/${ action.taskId }`,
      { 'Content-Type': 'application/json' }
    );
  },

};
