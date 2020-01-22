import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { of } from 'rxjs/observable/of'

import { debounceUntilChanged } from 'helpers/rxjs'
import { requestFailed } from 'helpers/redux/requests'
import { actions } from './tasks.actions'
import { API } from 'api/index'

export const tasksEpics = {}

const DEBOUNCE_TIME = 250

const requestFailedTasks = requestFailed(actions);

tasksEpics.fetchTasksEpic = action$ =>
  {
    return action$.ofType('FETCH_TASKS')
      .mergeMap(action => {
        return API.fetchTasks(action)
          .map(response => {
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.fetchTasksSucceeded(response.result)
          })
          .catch(error => requestFailedTasks(error))
      })
  }

tasksEpics.addTaskEpic = action$ =>
  {
    return action$.ofType('ADD_TASK')
      .mergeMap(action => {
        return API.addTask(action)
          .map(res => {
            const response = res.response
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.addTaskSucceeded(response.result)
          })
          .catch(error => requestFailedTasks(error))
      })
  }

tasksEpics.updateTaskEpic = action$ =>
  {
    return action$.ofType('UPDATE_TASK')
      //.pipe(debounceUntilChanged(DEBOUNCE_TIME, 'task', '_id'))
      .mergeMap(action => {
        return API.updateTask(action)
          .map(res => {
            const response = res.response
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.updateTaskSucceeded(response.result)
          })
          .catch(error => requestFailedTasks(error))
      })
  }

tasksEpics.deleteTaskEpic = action$ =>
  {
    return action$.ofType('DELETE_TASK')
      .mergeMap(action => {
        return API.deleteTask(action)
          .map(res => {
            if (!res.success) {
              return actions.requestFailed({
                ...res.error,
              })
            }

            return actions.deleteTaskSucceeded()
          })
          .catch(error => requestFailedTasks(error))
      })
  }