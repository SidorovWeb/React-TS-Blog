interface Categories {
  name: string
  slug: string
}

export interface IPostListProps {
  author: string
  authorPhoto: string
  title: string
  previewImage: string
  timestamp: any
  content: string
  excerpt: string
  slug: string
  categories: Categories[]
  id: string
  uid: string
  status: string
}

export interface postStatusProps {
  type: string
  message: string
}

export interface postState {
  posts: IPostListProps[]
  isLoading: boolean
  error: null | string
  postStatus: postStatusProps
}

export enum postType {
  POST_START = 'POST_START',
  POST_CREATE = 'POST_CREATE',
  POST_READ = 'POST_READ',
  POST_DELETE = 'POST_DELETE',
  POST_ERROR = 'POST_ERROR',
  POST_STATUS = 'POST_STATUS',
  POST_UPDATE = 'POST_UPDATE',
}

interface postActionStart {
  type: postType.POST_START
}

interface postActionCreate {
  type: postType.POST_CREATE
}

interface postActionRead {
  type: postType.POST_READ
  payload: IPostListProps[]
}

interface postActionDelete {
  type: postType.POST_DELETE
}
interface postActionUpdate {
  type: postType.POST_UPDATE
}

interface postActionError {
  type: postType.POST_ERROR
  payload: string
}

interface postActionStatus {
  type: postType.POST_STATUS
  payload: {
    type: string
    message: string
  }
}

export type postAction =
  | postActionStart
  | postActionCreate
  | postActionError
  | postActionRead
  | postActionStatus
  | postActionDelete
  | postActionUpdate
