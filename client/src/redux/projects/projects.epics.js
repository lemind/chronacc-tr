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
          .map(res => {
            if (!res.success) {
              return actions.requestFailed({
                ...res.error,
              })
            }

            return actions.fetchProjectsSucceeded(res.result)
          })
          .catch(error => of(
            actions.requestFailed({
              id: JSON.stringify(error),
              message: JSON.stringify({
                url: error.request.url,
                message: error.message
              }),
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
            const response = res.response
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.updateProjectSucceeded(response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              id: JSON.stringify(error),
              message: JSON.stringify({
                url: error,
                message: error.message
              }),
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
            const response = res.response
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.deleteProjectSucceeded()
          })
          .catch(error => of(
            actions.requestFailed({
              id: JSON.stringify(error),
              message: JSON.stringify({
                url: error.request.url,
                message: error.message
              }),
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
            const response = res.response
            if (!response.success) {
              return actions.requestFailed({
                ...response.error,
              })
            }

            return actions.addProjectSucceeded(response.result)
          })
          .catch(error => of(
            actions.requestFailed({
              id: JSON.stringify(error),
              message: JSON.stringify({
                url: error.request.url,
                message: error.message
              }),
            })
          ))
      })
  }