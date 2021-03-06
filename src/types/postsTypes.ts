export interface Categories {
  value: string
  label: string
}

interface previewImage {
  url: string
  fileLocated: string
}

interface status {
  type: string
  message: string
}

interface authorPhoto {
  fileLocated: string
  url: string
}

export interface postListProps {
  author: string
  authorPhoto: authorPhoto
  title: string
  previewImage: previewImage
  timestamp: any
  content: string
  excerpt: string
  slug: string
  categories: Categories[]
  id: string
  uid: string
  status: status
}

export interface postStatusProps {
  type: string
  message: string
}

export interface postState {
  posts: postListProps[]
  isLoading: boolean
  error: null | string
  postStatus: postStatusProps
}

export enum postType {
  POST_CREATE_START = 'POST__CREATE_START',
  POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS',
  POST__CREATE_ERROR = 'POST__CREATE_ERROR',
  POSTS_READ_START = 'POSTS_READ_START',
  POSTS_READ_SUCCESS = 'POSTS_READ_SUCCESS',
  POSTS_READ_ERROR = 'POSTS_READ_ERROR',
  POST_DELETE_START = 'POST_DELETE_START',
  POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS',
  POST_DELETE_ERROR = 'POST_DELETE_ERROR',
  POST_UPDATE_START = 'POST_UPDATE_START',
  POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS',
  POST_UPDATE_ERROR = 'POST_UPDATE_ERROR',
  POST_STATUS_CHANGE = 'POST_STATUS_CHANGE',
}

interface postActionCreateStart {
  type: postType.POST_CREATE_START
}
interface postActionCreateSuccess {
  type: postType.POST_CREATE_SUCCESS
  payload: postListProps
}
interface postActionCreateError {
  type: postType.POST__CREATE_ERROR
  payload: string
}

interface postsActionReadStart {
  type: postType.POSTS_READ_START
}
interface postsActionReadSuccess {
  type: postType.POSTS_READ_SUCCESS
  payload: postListProps[]
}
interface postsActionReadError {
  type: postType.POSTS_READ_ERROR
  payload: string
}

interface postActionUpdateStart {
  type: postType.POST_UPDATE_START
}
interface postActionUpdateSuccess {
  type: postType.POST_UPDATE_SUCCESS
  payload: postListProps
}
interface postActionUpdateError {
  type: postType.POST_UPDATE_ERROR
  payload: string
}

interface postActionDeleteStart {
  type: postType.POST_DELETE_START
}
interface postActionDeleteSuccess {
  type: postType.POST_DELETE_SUCCESS
  payload: postListProps
}
interface postActionDeleteError {
  type: postType.POST_DELETE_ERROR
  payload: string
}

interface postActionStatusChange {
  type: postType.POST_STATUS_CHANGE
  payload: {
    type: string
    message: string
  }
}

export type postAction =
  | postActionCreateStart
  | postActionCreateSuccess
  | postActionCreateError
  | postsActionReadStart
  | postsActionReadSuccess
  | postsActionReadError
  | postActionUpdateStart
  | postActionUpdateSuccess
  | postActionUpdateError
  | postActionDeleteStart
  | postActionDeleteSuccess
  | postActionDeleteError
  | postActionStatusChange
