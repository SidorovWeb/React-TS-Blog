export interface storageState {
  url: string
  isLoading: boolean
  error: null | string
}

export enum storageType {
  STORAGE_START = 'STORAGE_START',
  STORAGE_SUCCESS = 'STORAGE_SUCCESS',
  STORAGE_ERROR = 'STORAGE_ERROR',
  STORAGE_DELETE_START = 'STORAGE_DELETE_START',
  STORAGE_DELETE_SUCCESS = 'STORAGE_DELETE_SUCCESS',
  STORAGE_DELETE_ERROR = 'STORAGE_DELETE_ERROR',
}

export interface storageActionStart {
  type: storageType.STORAGE_START
}

export interface storageActionSuccess {
  type: storageType.STORAGE_SUCCESS
}
export interface storageActionError {
  type: storageType.STORAGE_ERROR
  payload: null | string
}

export interface storageActionDeleteStart {
  type: storageType.STORAGE_DELETE_START
}

export interface storageActionDeleteSuccess {
  type: storageType.STORAGE_DELETE_SUCCESS
}
export interface storageActionDeleteError {
  type: storageType.STORAGE_DELETE_ERROR
  payload: null | string
}

export type storageAction =
  | storageActionStart
  | storageActionSuccess
  | storageActionError
  | storageActionDeleteStart
  | storageActionDeleteSuccess
  | storageActionDeleteError
