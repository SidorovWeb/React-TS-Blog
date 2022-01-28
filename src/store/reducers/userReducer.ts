import { defaultUser } from '../../constants'
import { userAction, userState, userType } from '../../types/userTypes'

const initialState: userState = {
  user: defaultUser,
  isLoading: true,
  error: null,
}

export const userReducer = (state = initialState, action: userAction): userState => {
  switch (action.type) {
    case userType.USER_READ_START:
      return { ...state, isLoading: true, error: null }
    case userType.USER_READ_SUCCESS:
      return { ...state, isLoading: false, user: action.payload }
    case userType.USER_READ_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    case userType.USER_UPDATE_START:
      return { ...state, isLoading: false, error: null }
    case userType.USER_UPDATE_SUCCESS:
      return { ...state, isLoading: false, user: action.payload }
    case userType.USER_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    default:
      return state
  }
}
