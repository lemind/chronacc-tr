import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import queryString from 'query-string'
import { ApiTaskActionType } from 'src/redux/tasks'
import { ITask } from 'models/Task'
import { TBackDataVersion, TBackDataError } from './index'

type TTaskRaw = ITask & TBackDataVersion

type TResponse = {
  result: TTaskRaw[], // not required
  error: TBackDataError, // not required
  success: boolean
}

export const tasksAPI = {
  fetchTasks: (action) => {
    const { params } = action

    const paramsStr = queryString.stringify(params)
    return ajax.getJSON<TResponse>(`${API_HOST}/tasks?${paramsStr}`)
  },
  createTask: (action: ApiTaskActionType) => {
    return ajax.post(
      `${API_HOST}/task`,
      action.payload,
      HEADERS
    );
  },
  updateTask: (action: ApiTaskActionType) => {
    return ajax.put(
      `${API_HOST}/task`,
      action.payload,
      HEADERS
    );
  },
  deleteTask: (action: ApiTaskActionType) => {
    return ajax.delete(
      `${API_HOST}/task/${ action.payload }`,
      HEADERS
    );
  },

}
