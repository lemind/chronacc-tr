import { getType, ActionType } from 'typesafe-actions'

import { AuthUserType, TokenType, ErrorType } from 'models/AuthUser'
import actions from './auth.actions'

type Action = ActionType<typeof actions>

export interface IAuthState {
  token: TokenType,
  user: AuthUserType | null,
  loading: boolean,
  error: ErrorType
}

export const initialState: IAuthState = {
  token: '',
  user: null,
  loading: false,
  error: null,
}

const {
  login, signup
} = actions

const loginType = getType(login.request)
const loginSuccededType = getType(login.success)
const loginFailedType = getType(login.failure)

const signupType = getType(signup.request)
const signupSuccededType = getType(signup.success)

export const reducer = (state: IAuthState = initialState, action: Action) => {

  switch (action.type) {
    case loginType:
      return {
        ...state,
        loading: true
      }
    case loginSuccededType:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case loginFailedType:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case signupType:
      return {
        ...state,
        loading: true
      }
    case signupSuccededType:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    default:
      return state
  }
}