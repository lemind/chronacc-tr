
export type AuthUserType = {
  name?: string,
  email: string
}

export type AuthUserFormType = {
  email: string
  password: string,
}

export interface IAuthUser {
  token: string
  user: AuthUserType;
}

export default class AuthUser implements IAuthUser {
  token: string = ''
  user: AuthUserType = {
    email: ''
  }
  constructor(initial?: IAuthUser) {
    Object.assign(this, initial)
  }
}
