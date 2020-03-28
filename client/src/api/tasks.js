import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import queryString from 'query-string'

export const tasksAPI = {
  fetchTasks: (action) => {
    const { params } = action

    const paramsStr = queryString.stringify(params)
    return ajax.getJSON(`${API_HOST}/tasks?${paramsStr}`)
  },
  addTask: (action) => {
    return ajax.post(
      `${API_HOST}/task`,
      action.task,
      HEADERS
    );
  },
  updateTask: (action) => {
    return ajax.put(
      `${API_HOST}/task`,
      action.task,
      HEADERS
    );
  },
  deleteTask: (action) => {
    return ajax.delete(
      `${API_HOST}/task/${ action.taskId }`,
      HEADERS
    );
  },

}
