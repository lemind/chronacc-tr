import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'

// import { debounceUntilChanged } from 'helpers/rxjs'
import { requestFailed } from 'helpers/redux/requests'
import { actions } from './projects.actions'
import { API } from 'api/index';

export const projectsEpics = {}

const DEBOUNCE_TIME = 250

const requestFailedProjects = requestFailed(actions);

projectsEpics.fetchProjectsEpic = action$ => action$.pipe(
  ofType('FETCH_PROJECTS'),
  mergeMap(action => {
    return API.fetchProjects().pipe(
      map(res => {
        if (!res.success) {
          return actions.requestFailed({
            ...res.error,
          })
        }

        return actions.fetchProjectsSucceeded(res.result)
      }),
      catchError(error => requestFailedProjects(error))
    )
  })
)

projectsEpics.updateProjectEpic = action$ => action$.pipe(
  ofType('UPDATE_PROJECT'),
  mergeMap(action => {
    return API.updateProject(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.updateProjectSucceeded(response.result)
      }),
      catchError(error => requestFailedProjects(error))
    )
  })
)

projectsEpics.deleteProjectEpic = action$ => action$.pipe(
  ofType('DELETE_PROJECT'),
  mergeMap(action => {
    return API.deleteProject(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.deleteProjectSucceeded()
      }),
      catchError(error => requestFailedProjects(error))
    )
  })
)

projectsEpics.addProjectEpic = action$ => action$.pipe(
  ofType('ADD_PROJECT'),
  mergeMap(action => {
    return API.addProject(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return actions.requestFailed({
            ...response.error,
          })
        }

        return actions.addProjectSucceeded(response.result)
      }),
      catchError(error => requestFailedProjects(error))
    )
  })
)
