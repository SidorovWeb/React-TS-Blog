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
    case postType.POST_CREATE_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_CREATE_SUCCESS:
      return { ...state, isLoading: false, posts: [...state.posts, action.payload] }
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
      const postsMap = state.posts.map(function (item) {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })

      return { ...state, isLoading: false, posts: postsMap }
    case postType.POST_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case postType.POST_DELETE_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_DELETE_SUCCESS:
      const postsFilter = state.posts.filter((item) => item.id !== action.payload.id)
      return { ...state, isLoading: false, posts: postsFilter }
    case postType.POST_DELETE_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    case postType.POST_STATUS_CHANGE:
      return { ...state, postStatus: { ...action.payload } }

    default:
      return state
  }
}
