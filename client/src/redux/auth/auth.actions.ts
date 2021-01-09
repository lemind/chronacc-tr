import { createAsyncAction, createAction} from 'typesafe-actions'
import { IAuthUser, AuthUserFormType } from 'models/AuthUser'

// TTODO
type Error = {}

const login = createAsyncAction(
  'LOGIN',
  'LOGIN_SUCCEEDED',
  'REQUEST_FAILED',
)<AuthUserFormType, IAuthUser, Error>()

const signup = createAsyncAction(
  'SIGNUP',
  'SIGNUP_SUCCEEDED',
  'REQUEST_FAILED',
)<AuthUserFormType, IAuthUser, Error>()

const logout = createAction(
  'LOGOUT',
)<void>()

export default {
  login,
  signup,
  logout,
}
