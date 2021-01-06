import { ajax } from 'rxjs/ajax'
import { HEADERS, AUTH_API_HOST } from '../config'
import { AuthActionType } from 'src/redux/auth'
import { AuthCases } from 'cases/auth'
import AuthGateway from 'src/redux/auth'

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

type Headers = {
  'Content-Type': string,
  authorization: string,
}

export function getHeadersWithToken() {
  const authCases = new AuthCases([AuthGateway])

  const headers = {...HEADERS} as Headers

  const token = authCases.getUserToken();
  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  return headers
}
