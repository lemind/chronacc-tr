import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import queryString from 'query-string'
import { ApiTaskActionType } from 'src/redux/tasks'
import { ITask } from 'models/Task'
import { TBackDataVersion, TBackDataError } from './index'
import { getHeadersWithToken } from './auth'

type TTaskRaw = ITask & TBackDataVersion

type TResponse = {
  result: TTaskRaw[], // not required
  error: TBackDataError, // not required
  success: boolean
}

export const tasksAPI = {
  fetchTasks: (action) => {
    const { payload } = action

    const paramsStr = queryString.stringify(payload)
    return ajax.getJSON<TResponse>(`${API_HOST}/tasks?${paramsStr}`)
  },
  createTask: (action: ApiTaskActionType) => {
    // ToDo: extract?
    const headers = getHeadersWithToken()
    return ajax.post(
      `${API_HOST}/task`,
      action.payload,
      headers
    );
  },
  updateTask: (action: ApiTaskActionType) => {
    const headers = getHeadersWithToken()
    return ajax.put(
      `${API_HOST}/task`,
      action.payload,
      headers
    );
  },
  deleteTask: (action: ApiTaskActionType) => {
    const headers = getHeadersWithToken()
    return ajax.delete(
      `${API_HOST}/task/${ action.payload }`,
      headers
    );
  },

}
