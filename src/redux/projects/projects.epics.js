import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { actions } from './projects.actions';
import { API } from 'api/index';

export const projectsEpics = {};

projectsEpics.fetchProjectsEpic = action$ =>
  {
    return action$.ofType('FETCH_PROJECTS')
      .mergeMap(action => {
        return API.fetchProjects()
          .map(response => {
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
