import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { debounceUntilChanged } from 'helpers/rxjs'
import { actions } from './projects.actions'
import { API } from 'api/index';

export const projectsEpics = {};

const DEBOUNCE_TIME = 250

projectsEpics.fetchProjectsEpic = action$ =>
  {
    return action$.ofType('FETCH_PROJECTS')
      .mergeMap(action => {
        return API.fetchProjects()
          .map(response => {
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.fetchProjectsSucceeded(response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

projectsEpics.updateProjectEpic = action$ =>
  {
    return action$.ofType('UPDATE_PROJECT')
      //.pipe(debounceUntilChanged(DEBOUNCE_TIME, 'project', '_id'))
      .mergeMap(action => {
        return API.updateProject(action)
          .map(res => {
            return actions.updateProjectSucceeded(res.response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

projectsEpics.deleteProjectEpic = action$ =>
  {
    return action$.ofType('DELETE_PROJECT')
      .mergeMap(action => {
        return API.deleteProject(action)
          .map(res => {
            return actions.deleteProjectSucceeded()
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }

projectsEpics.addProjectEpic = action$ =>
  {
    return action$.ofType('ADD_PROJECT')
      .mergeMap(action => {
        return API.addProject(action)
          .map(res => {
            return actions.addProjectSucceeded(res.response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              status: '' + error,
            })
          ))
      })
  }