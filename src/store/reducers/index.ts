import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { modalReducer } from './modalReducer'
import { postReducer } from './postReducer'
import { registerReducer } from './registerReducer'
import { storageReducer } from './storageReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  modal: modalReducer,
  post: postReducer,
  storage: storageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
