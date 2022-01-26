export interface User {
  userName: string
  email: string
  timestamp: {}
  id: string
  userPhoto: string
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
  SET_USER = 'SET_USER',
  SET_USER_START = 'SET_USER_START',
  SET_USER_ERROR = 'SET_USER_ERROR',
  UPDATE_USER = 'UPDATE_USER',
  SET_USER_UPLOAD_PHOTO = 'SET_USER_UPLOAD_PHOTO',
}

export interface userActionStart {
  type: userType.SET_USER_START
}

export interface userActionSuccess {
  type: userType.SET_USER
  payload: User
}
export interface userActionError {
  type: userType.SET_USER_ERROR
  payload: null | string
}
export interface userActionUpdate {
  type: userType.UPDATE_USER
  payload: User
}
export interface userActionUploadPhoto {
  type: userType.SET_USER_UPLOAD_PHOTO
  payload: any
}

export type userAction =
  | userActionSuccess
  | userActionStart
  | userActionError
  | userActionUpdate
  | userActionUploadPhoto
