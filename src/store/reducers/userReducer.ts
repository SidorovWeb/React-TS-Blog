import { defaultUser } from '../../constants'
import { userAction, userState, userType } from '../../types/userTypes'

const initialState: userState = {
  user: defaultUser,
  users: [],
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
      return { ...state, isLoading: true, error: null }
    case userType.USER_UPDATE_SUCCESS:
      return { ...state, isLoading: false, user: action.payload }
    case userType.USER_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case userType.USERS_READ_START:
      return { ...state, isLoading: true, error: null }
    case userType.USERS_READ_SUCCESS:
      return { ...state, isLoading: false, users: [...action.payload] }
    case userType.USERS_READ_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case userType.USERS_UPDATE_START:
      return { ...state, isLoading: true, error: null }
    case userType.USERS_UPDATE_SUCCESS:
      const newUsers = state.users.map((u) => {
        if (u.id === action.payload.id) {
          return action.payload
        }
        return u
      })
      return { ...state, isLoading: false, users: newUsers }
    case userType.USERS_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    default:
      return state
  }
}
