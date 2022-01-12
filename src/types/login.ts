export interface SignInData {
  email: string
  password: string
}

export interface loginState {
  isLoading: boolean
  error: null | string
}

export enum loginType {
  LOGIN_START = 'LOGIN_START',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
}

interface loginActionStart {
  type: loginType.LOGIN_START
}
interface loginActionSuccess {
  type: loginType.LOGIN_SUCCESS
}
interface loginActionError {
  type: loginType.LOGIN_ERROR
  payload: string
}

export type loginAction = loginActionStart | loginActionSuccess | loginActionError
