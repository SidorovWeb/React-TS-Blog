import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { registerReducer } from './registerReducer'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
