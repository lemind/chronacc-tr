
// TToDo
export type TokenType = string
export type ErrorType = object | null

export type AuthUserType = {
  name?: string,
  email: string
}

export type AuthUserFormType = {
  email: string
  password: string,
}

export interface IAuthUser {
  token: TokenType
  user: AuthUserType;
}

export default class AuthUser implements IAuthUser {
  token: TokenType = ''
  user: AuthUserType = {
    email: ''
  }
  constructor(initial?: IAuthUser) {
    Object.assign(this, initial)
  }
}
