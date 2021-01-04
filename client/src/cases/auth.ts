import { casesFactory } from 'helpers/case'
import Cases, { ICases } from './index'
import type { TFollowedStoreSchema } from './index'
import { AuthUserFormType } from '../models/AuthUser'
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
}

export default casesFactory(AuthCases, [AuthGateway], 'AuthCases')
