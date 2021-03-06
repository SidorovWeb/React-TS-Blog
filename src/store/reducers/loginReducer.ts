import { loginAction, loginState, loginType } from '../../types/loginTypes'

const initialState: loginState = {
  isLoading: false,
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
