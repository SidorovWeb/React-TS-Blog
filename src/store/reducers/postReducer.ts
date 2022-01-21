import { postAction, postState, postType } from '../../types/posts'

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
    case postType.POST_START:
      return { ...state, isLoading: true, error: null }
    case postType.POST_CREATE:
      return { ...state, isLoading: false }
    case postType.POST_READ:
      return { ...state, isLoading: false, posts: action.payload }
    case postType.POST_DELETE:
      return { ...state, isLoading: false }
    case postType.POST_STATUS:
      return { ...state, postStatus: { ...action.payload } }
    case postType.POST_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    default:
      return state
  }
}
