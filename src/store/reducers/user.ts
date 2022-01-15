import { userAction, userState, userType } from '../../types/user'

const initialState: userState = {
  user: {
    userName: '',
    email: '',
    timestamp: {},
    id: '',
    userPhoto: '',
    status: '',
  },
  isLoading: false,
}

export const userReducer = (state = initialState, action: userAction): userState => {
  switch (action.type) {
    case userType.SET_USER_START:
      return { ...state, isLoading: true }
    case userType.SET_USER:
      return { ...state, isLoading: false, user: action.payload }
    default:
      return state
  }
}
