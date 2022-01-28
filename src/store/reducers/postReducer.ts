import { postAction, postState, postType } from '../../types/postsTypes'

const initialState: postState = {
  posts: [],
  isLoading: false,
  error: null,
  postStatus: {
    type: '',
    message: '',
  },
}

export const postReducer = (state = initialState, action: postAction): postState => {
  switch (action.type) {
    case postType.POST__CREATE_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_CREATE_SUCCESS:
      return { ...state, isLoading: false }
    case postType.POST__CREATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case postType.POSTS_READ_START:
      return { ...state, isLoading: true, error: null }
    case postType.POSTS_READ_SUCCESS:
      return { ...state, isLoading: false, posts: action.payload }
    case postType.POSTS_READ_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case postType.POST_UPDATE_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_UPDATE_SUCCESS:
      return { ...state, isLoading: false }
    case postType.POST_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case postType.POST_DELETE_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_DELETE_SUCCESS:
      return { ...state, isLoading: false }
    case postType.POST_DELETE_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    case postType.POST_STATUS_CHANGE:
      return { ...state, postStatus: { ...action.payload } }

    default:
      return state
  }
}
