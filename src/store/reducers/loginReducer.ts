import { loginAction, loginState, loginType } from '../../types/login'

const initialState: loginState = {
  isLoading: true,
  error: null,
}

export const loginReducer = (state = initialState, action: loginAction): loginState => {
  switch (action.type) {
    case loginType.LOGIN_START:
      return { ...state, isLoading: true, error: null }
    case loginType.LOGIN_SUCCESS:
      return { ...state, isLoading: false }
    case loginType.LOGIN_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
