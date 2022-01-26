import { doc, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { User, userAction, userType } from '../../types/user'

export const user = (user: User) => (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.SET_USER, payload: user })
}

export const userUpdate = (user: User) => async (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.SET_USER_START })

  updateDoc(doc(db, 'users', user.id), {
    ...user,
  })
    .then(() => {
      dispatch({ type: userType.UPDATE_USER, payload: user })
      localStorage.setItem('currentUser', JSON.stringify({ ...user }))
    })
    .catch((error) => {
      dispatch({ type: userType.SET_USER_ERROR, payload: error.message })
    })
}
