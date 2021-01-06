import { casesFactory } from 'helpers/case'
import Cases, { ICases } from './index'
import type { TFollowedStoreSchema } from './index'
import { AuthUserFormType, AuthUserType, TokenType } from '../models/AuthUser'
import AuthGateway from 'src/redux/auth'

export interface IAuthCases {
  login(user: AuthUserFormType): void
  signup(user: AuthUserFormType): void
}

export type IAuthCasesCommon = IAuthCases & ICases;

export class AuthCases extends Cases implements IAuthCases {
  setObservables(): TFollowedStoreSchema[] {
    return [{store: 'auth', variables: ['user', 'token']}]
  }

  login(user: AuthUserFormType): void {
    const { authGateway } = this.gateways
    authGateway.login(user)
  }

  signup(user: AuthUserFormType): void {
    const { authGateway } = this.gateways
    authGateway.signup(user)
  }

  getUser(): AuthUserType | null {
    const { authGateway } = this.gateways
    const state = authGateway.store.getState()
    return state.auth.user
  }

  getUserToken(): TokenType | null {
    const { authGateway } = this.gateways
    const state = authGateway.store.getState()
    return state.auth.token
  }
}

export default casesFactory(AuthCases, [AuthGateway], 'AuthCases')
