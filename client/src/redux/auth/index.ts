import { ActionType } from 'typesafe-actions'

import actions from './auth.actions'
import { reducer } from './auth.reducer'
import authEpics from './auth.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway, { IGateway } from 'src/redux/Gateway'

import { AuthUserFormType, AuthUserEmail } from 'models/AuthUser'

export type AuthActionType = ActionType<typeof actions>

export {
  actions as authActions,
  reducer as authReducer,
  authEpics,
}

export interface IAuthGateway {
  login(user: AuthUserFormType): void
  signup(newProject: AuthUserFormType): void
  getAuthUserEmail(): AuthUserEmail | null
  logout(): void
}

export type IAuthGatewayCommon = IAuthGateway & IGateway

export class AuthGateway extends Gateway implements IAuthGateway {
  login(user: AuthUserFormType): void {
    this.dispatch(actions.login.request(user))
  }

  signup(user: AuthUserFormType): void {
    this.dispatch(actions.signup.request(user))
  }

  logout(): void {
    this.dispatch(actions.logout())
  }

  getAuthUserEmail(): AuthUserEmail | null {
    return this.state.auth.user?.email || null
  }
}

export default gatewayFactory<IAuthGatewayCommon>(AuthGateway)
