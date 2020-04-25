import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { getType } from 'typesafe-actions'

import { requestFailed } from 'helpers/redux/requests'
import actions from './tasks.actions'
import { API } from 'api/index'

import { TRootEpic } from 'src/redux/root'

const requestFailedTasks = requestFailed(actions);

const {
  fetchTasks,
  updateTask,
  deleteTask,
  createTask,
} = actions

const fetchTasksType = getType(fetchTasks.request)
const updateTaskType = getType(updateTask.request)
const deleteTaskType = getType(deleteTask.request)
const createTaskType = getType(createTask.request)

const fetchTasksEpic: TRootEpic = action$ => action$.pipe(
  ofType(fetchTasksType),
  mergeMap(action => {
    return API.fetchTasks(action).pipe(
      map(response => {
        if (!response.success) {
          return fetchTasks.failure({
            ...response.error,
          })
        }

        return fetchTasks.success(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

const createTaskEpic: TRootEpic = action$ => action$.pipe(
  ofType(createTaskType),
  mergeMap(action => {
    return API.createTask(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return createTask.failure({
            ...response.error,
          })
        }

        return createTask.success(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

const updateTaskEpic: TRootEpic = action$ => action$.pipe(
  ofType(updateTaskType),
  mergeMap(action => {
    return API.updateTask(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return updateTask.failure({
            ...response.error,
          })
        }

        return updateTask.success(response.result)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

const deleteTaskEpic: TRootEpic = action$ => action$.pipe(
  ofType(deleteTaskType),
  mergeMap(action => {
    return API.deleteTask(action).pipe(
      map(res => {
        const { response } = res
        if (!response.success) {
          return deleteTask.failure({
            ...response.error,
          })
        }

        const { _id } = response.delete
        return deleteTask.success(_id)
      }),
      catchError(error => requestFailedTasks(error))
    )
  })
)

export default [
  fetchTasksEpic,
  createTaskEpic,
  updateTaskEpic,
  deleteTaskEpic,
];
