import { ajax } from 'rxjs/ajax'
import { HEADERS, AUTH_API_HOST } from '../config'
import { AuthActionType } from 'src/redux/auth'

export const authAPI = {
  login: (action: AuthActionType) => {
    return ajax.post(
      `${AUTH_API_HOST}/user/login`,
      action.payload,
      HEADERS
    )
  },
  signup: (action: AuthActionType) => {
    return ajax.post(
      `${AUTH_API_HOST}/user/signup`,
      action.payload,
      HEADERS
    )
  },
}
