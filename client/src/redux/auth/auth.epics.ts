import { ofType } from 'redux-observable'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { getType } from 'typesafe-actions'
import { of } from "rxjs"

import actions from './auth.actions'
import { API } from 'api/index'

import { TRootEpic } from 'src/redux/root'
import { AuthActionType } from '.'

const {
  login,
  signup,
} = actions

const loginType = getType(login.request)
const signupType = getType(signup.request)

const loginEpic: TRootEpic = action$ => action$.pipe(
  ofType(loginType),
  mergeMap(action => {
    return API.login(action as AuthActionType).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return login.failure({
            ...response.error,
          })
        }

        return login.success(response)
      }),
      catchError(error => of(login.failure(error)))
    )
  })
)

const signupEpic: TRootEpic = action$ => action$.pipe(
  ofType(signupType),
  mergeMap(action => {
    return API.signup(action as AuthActionType).pipe(
      map(res => {
        const response = res.response
        if (!response.success) {
          return signup.failure({
            ...response.error,
          })
        }

        return signup.success(response)
      }),
      catchError(error => of(signup.failure(error)))
    )
  })
)

export default [
  loginEpic,
  signupEpic,
]
