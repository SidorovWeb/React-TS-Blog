import { defaultUser } from '../../constants'
import { userAction, userState, userType } from '../../types/user'

const initialState: userState = {
  user: defaultUser,
  isLoading: true,
  error: null,
}

export const userReducer = (state = initialState, action: userAction): userState => {
  switch (action.type) {
    case userType.SET_USER_START:
      return { ...state, isLoading: true, error: null }
    case userType.SET_USER:
      return { ...state, isLoading: false, user: action.payload }
    case userType.UPDATE_USER:
      return { ...state, isLoading: false, user: action.payload }
    case userType.SET_USER_UPLOAD_PHOTO:
      return { ...state, isLoading: false, user: action.payload }
    case userType.SET_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
