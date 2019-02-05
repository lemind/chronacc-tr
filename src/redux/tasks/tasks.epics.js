import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { of } from 'rxjs/observable/of'

import { Observable } from 'rxjs'

import { actions } from './tasks.actions'
import { API } from 'api/index'

export const tasksEpics = {}

const DEBOUNCE_TIME = 250

tasksEpics.fetchTasksEpic = action$ =>
  {
    return action$.ofType('FETCH_TASKS')
      .mergeMap(action => {
        return API.fetchTasks()
          .map(response => {
            return actions.fetchTasksSucceeded(response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

tasksEpics.addTaskEpic = action$ =>
  {
    return action$.ofType('ADD_TASK')
      .mergeMap(action => {
        return API.addTask(action)
          .map(res => {
            return actions.addTaskSucceeded(res.response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

// ToDo: reconsider
const debounceUntilChanged = (delay, objectKey, subKey) => source$ => {
  return new Observable(observer => {
    let lastChanged
    let first = true

    return source$
      .map(value => {
        if (first) {
          first = !first
          lastChanged = value[objectKey][subKey]
        }
        return value
      })
      .debounce(value => {
        if (value[objectKey][subKey] !== lastChanged) {
          return Observable
            .timer(delay)
            .do(() => {
              lastChanged = value[objectKey][subKey]
            })
        } else {
          lastChanged = {}
          return Observable.empty()
        }
      })
      .subscribe(observer)
  })
}

tasksEpics.updateTaskEpic = action$ =>
  {
    return action$.ofType('UPDATE_TASK')
      .pipe(debounceUntilChanged(DEBOUNCE_TIME, 'task', '_id'))
      .mergeMap(action => {
        return API.updateTask(action)
          .map(res => {
            return actions.updateTaskSucceeded(res.response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

tasksEpics.deleteTaskEpic = action$ =>
  {
    return action$.ofType('DELETE_TASK')
      .mergeMap(action => {
        return API.deleteTask(action)
          .map(res => {
            return actions.deleteTaskSucceeded()
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }