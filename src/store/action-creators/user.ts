import { Dispatch } from 'redux'
import { User, userAction, userType } from '../../types/user'

export const user = (data: User) => (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.SET_USER, payload: data })
}
