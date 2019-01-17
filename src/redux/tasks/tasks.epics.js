import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { actions } from './tasks.actions';
import { API } from '../../api/index';

export const tasksEpics = {};

tasksEpics.fetchTasksEpic = action$ =>
  {
    return action$.ofType('FETCH_TASKS')
      .mergeMap(action => {
        return API.fetchTasks()
          .map(response => {
            return actions.fetchTasksSucceeded(response.result)
          })
          .catch(error => of(
            actions.fetchTasksFailed({
              status: '' + response.status,
            })
          ));
      });
  }

tasksEpics.addTaskEpic = action$ =>
  {
    return action$.ofType('ADD_TASK')
      .mergeMap(action => {
        return API.addTask(action)
          .map(res => {
            console.log('epic/resp', res.response)

            return actions.addTaskSucceeded(res.response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + response.status,
            })
          ));
      });
  }
