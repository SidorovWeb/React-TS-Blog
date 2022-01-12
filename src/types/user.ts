export interface User {
  userName: string
  email: string
  timestamp: {}
  id: string
}

export interface userState {
  user: User | null
  isLoading: boolean
}

export enum userType {
  SET_USER = 'SET_USER',
  SET_USER_START = 'SET_USER_START',
}

export interface userActionStart {
  type: userType.SET_USER_START
}

export interface userActionSuccess {
  type: userType.SET_USER
  payload: User
}

export type userAction = userActionSuccess | userActionStart
