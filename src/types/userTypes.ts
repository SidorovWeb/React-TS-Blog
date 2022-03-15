interface notification {
  postName: string
  postId: string
  postStatus: string
  message: string
  id: number
}

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
  notification: notification[]
  uid: string
}

export interface userState {
  user: User
  users: User[]
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

  USERS_READ_START = 'USERS_READ_START',
  USERS_READ_SUCCESS = 'USERS_READ_SUCCESS',
  USERS_READ_ERROR = 'USERS_READ_ERROR',

  USERS_UPDATE_START = 'USERS_UPDATE_START',
  USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS',
  USERS_UPDATE_ERROR = 'USERS_UPDATE_ERROR',
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
  payload?: User | any
}
export interface userUpdateActionError {
  type: userType.USER_UPDATE_ERROR
  payload: null | string
}

export interface usersReadActionStart {
  type: userType.USERS_READ_START
}

export interface usersReadActionSuccess {
  type: userType.USERS_READ_SUCCESS
  payload: User[]
}
export interface usersReadActionError {
  type: userType.USERS_READ_ERROR
  payload: null | string
}

export interface usersUpdateActionStart {
  type: userType.USERS_UPDATE_START
}

export interface usersUpdateActionSuccess {
  type: userType.USERS_UPDATE_SUCCESS
  payload: User
}
export interface usersUpdateActionError {
  type: userType.USERS_UPDATE_ERROR
  payload: null | string
}

export type userAction =
  | userReadActionStart
  | userReadActionSuccess
  | userReadActionError
  | usersReadActionStart
  | usersReadActionSuccess
  | usersReadActionError
  | userUpdateActionStart
  | userUpdateActionSuccess
  | userUpdateActionError
  | usersUpdateActionStart
  | usersUpdateActionSuccess
  | usersUpdateActionError
