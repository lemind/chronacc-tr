import { ofType } from 'redux-observable'
import { mergeMap, map, catchError, debounceTime } from 'rxjs/operators'
import { getType } from 'typesafe-actions'
import { of } from "rxjs"

// import { debounceUntilChanged } from 'helpers/rxjs'
import { requestFailed } from 'helpers/redux/requests'
import actions from './projects.actions'
import { API } from 'api/index'

import { TRootEpic } from 'src/redux/root'

// ToDo: can we adjust that
const requestFailedProjects = requestFailed(actions)

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

// ToDo: prevent many reqs
const fetchProjectsEpic: TRootEpic = action$ => action$.pipe(
  ofType(fetchProjectsType),
  mergeMap(action => {
    return API.fetchProjects().pipe(
      debounceTime(500),
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

const updateProjectEpic: TRootEpic = action$ => action$.pipe(
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

const deleteProjectEpic: TRootEpic = action$ => action$.pipe(
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

const createProjectEpic: TRootEpic = action$ => action$.pipe(
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

export default [
  fetchProjectsEpic,
  updateProjectEpic,
  deleteProjectEpic,
  createProjectEpic,
];
