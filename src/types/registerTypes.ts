export interface SignUpData {
  email: string
  password: string
  username: string
}

export interface registerState {
  isLoading: boolean
  error: null | string
}

export enum registerType {
  REGISTER_START = 'REGISTER_START',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_ERROR = 'REGISTER_ERROR',
}

interface registerActionStart {
  type: registerType.REGISTER_START
}
interface registerActionSuccess {
  type: registerType.REGISTER_SUCCESS
}
interface registerActionError {
  type: registerType.REGISTER_ERROR
  payload: string
}

export type registerAction = registerActionStart | registerActionSuccess | registerActionError
