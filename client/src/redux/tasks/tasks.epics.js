import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'

import { requestFailed } from 'helpers/redux/requests'
import { actions } from './tasks.actions'
import { API } from 'api/index'

export const tasksEpics = {}

const DEBOUNCE_TIME = 250

const requestFailedTasks = requestFailed(actions);

tasksEpics.fetchTasksEpic = action$ => action$.pipe(
  ofType('FETCH_TASKS'),
  mergeMap(action => {
    return API.fetchTasks(action).pipe(
      map(response => {
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.fetchTasksSucceeded(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

tasksEpics.addTaskEpic = action$ => action$.pipe(
  ofType('ADD_TASK'),
  mergeMap(action => {
    return API.addTask(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.addTaskSucceeded(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

tasksEpics.updateTaskEpic = action$ => action$.pipe(
  ofType('UPDATE_TASK'),
  mergeMap(action => {
    return API.updateTask(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.updateTaskSucceeded(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

tasksEpics.deleteTaskEpic = action$ => action$.pipe(
  ofType('DELETE_TASK'),
  mergeMap(action => {
    return API.deleteTask(action).pipe(
      map(res => {
        if (!res.success) {
          return actions.requestFailed({
            ...res.error,
          })
        }

        return actions.deleteTaskSucceeded()
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)
