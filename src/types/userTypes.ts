export interface User {
  userName: string
  email: string
  timestamp: {}
  id: string
  userPhoto: {
    url: string
    fileLocated: string
  }
  status: string
  notification: string[]
  uid: string
}

export interface userState {
  user: User
  isLoading: boolean
  error: null | string
}

export enum userType {
  USER_READ_START = 'USER_READ_START',
  USER_READ_SUCCESS = 'USER_READ_SUCCESS',
  USER_READ_ERROR = 'USER_READ_ERROR',

  USER_UPDATE_START = 'USER_UPDATE_START',
  USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
  USER_UPDATE_ERROR = 'USER_UPDATE_ERROR',

  SET_USER_UPLOAD_PHOTO = 'SET_USER_UPLOAD_PHOTO',
}

export interface userReadActionStart {
  type: userType.USER_READ_START
}

export interface userReadActionSuccess {
  type: userType.USER_READ_SUCCESS
  payload: User
}
export interface userReadActionError {
  type: userType.USER_READ_ERROR
  payload: null | string
}
export interface userUpdateActionStart {
  type: userType.USER_UPDATE_START
}
export interface userUpdateActionSuccess {
  type: userType.USER_UPDATE_SUCCESS
  payload: User
}
export interface userUpdateActionError {
  type: userType.USER_UPDATE_ERROR
  payload: null | string
}

export type userAction =
  | userReadActionStart
  | userReadActionSuccess
  | userReadActionError
  | userUpdateActionStart
  | userUpdateActionSuccess
  | userUpdateActionError
