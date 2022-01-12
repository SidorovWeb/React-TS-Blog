import { registerAction, registerState, registerType } from '../../types/register'

const initialState: registerState = {
  isLoading: false,
  error: null,
}

export const registerReducer = (state = initialState, action: registerAction): registerState => {
  switch (action.type) {
    case registerType.REGISTER_START:
      return { ...state, isLoading: true, error: null }
    case registerType.REGISTER_SUCCESS:
      return { ...state, isLoading: false }
    case registerType.REGISTER_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
