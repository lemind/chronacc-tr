import { ofType, Epic } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { getType, ActionType } from 'typesafe-actions';
import { from, of } from "rxjs";

// import { debounceUntilChanged } from 'helpers/rxjs'
import { requestFailed } from 'helpers/redux/requests'
import { actions } from './projects.actions'
import { API } from 'api/index';

export const projectsEpics: any = {}

const DEBOUNCE_TIME = 250

// ToDo: can we adjust that
const requestFailedProjects = requestFailed(actions);

const {
  fetchProjects,
  updateProject,
  deleteProject,
  createProject,
} = actions

const fetchProjectsType = getType(fetchProjects.request)
const updateProjectType = getType(updateProject.request)
const deleteProjectType = getType(deleteProject.request)
const createProjectType = getType(createProject.request)

type Action = ActionType<typeof actions>;

projectsEpics.fetchProjectsEpic = action$ => action$.pipe(
  ofType(fetchProjectsType),
  mergeMap(action => {
    return API.fetchProjects().pipe(
      map(res => {
        if (!res.success) {
          return fetchProjects.failure({
            ...res.error,
          })
        }

        return fetchProjects.success(res.result)
      }),
      catchError(error => of(fetchProjects.failure(error)))
    )
  })
)

projectsEpics.updateProjectEpic = action$ => action$.pipe(
  ofType(updateProjectType),
  mergeMap(action => {
    return API.updateProject(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return updateProject.failure({
            ...response.error,
          })
        }

        return updateProject.success(response.result)
      }),
      catchError(error => of(updateProject.failure(error)))
    )
  })
)

projectsEpics.deleteProjectEpic = action$ => action$.pipe(
  ofType(deleteProjectType),
  mergeMap(action => {
    return API.deleteProject(action).pipe(
      map(res => {
        const { response } = res
        const { results } = response
        if (!response.success) {
          return deleteProject.failure({
            ...response.error,
          })
        }

        const { _id } = results.delete
        return deleteProject.success(_id)
      }),
      catchError(error => of(deleteProject.failure(error)))
    )
  })
)

projectsEpics.createProjectEpic = action$ => action$.pipe(
  ofType(createProjectType),
  mergeMap(action => {
    return API.createProject(action).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return createProject.failure({
            ...response.error,
          })
        }

        return createProject.success(response.result)
      }),
      catchError(error => of(createProject.failure(error)))
    )
  })
)
