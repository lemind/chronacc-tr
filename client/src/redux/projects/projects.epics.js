import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { debounceUntilChanged } from 'helpers/rxjs'
import { requestFailed } from 'helpers/redux/requests'
import { actions } from './projects.actions'
import { API } from 'api/index';

export const projectsEpics = {};

const DEBOUNCE_TIME = 250

const requestFailedProjects = requestFailed(actions);

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
          .catch(error => requestFailedProjects(error))
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
          .catch(error => requestFailedProjects(error))
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
          .catch(error => requestFailedProjects(error))
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
          .catch(error => requestFailedProjects(error))
      })
  }