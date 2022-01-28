import { doc, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { User, userAction, userType } from '../../types/userTypes'

export const user = (user: User) => (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USER_READ_SUCCESS, payload: user })
}

export const userUpdate = (user: User) => async (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USER_UPDATE_START })

  updateDoc(doc(db, 'users', user.id), {
    ...user,
  })
    .then(() => {
      localStorage.setItem('currentUser', JSON.stringify({ ...user }))
      dispatch({ type: userType.USER_UPDATE_SUCCESS, payload: user })
    })
    .catch((error) => {
      dispatch({ type: userType.USER_UPDATE_ERROR, payload: error.message })
    })
}
