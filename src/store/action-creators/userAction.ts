import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { useSelector } from '../../hooks/useTypedSelector'
import { User, userAction, userType } from '../../types/userTypes'

export const user = (user: User) => (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USER_READ_SUCCESS, payload: user })
}

export const usersRead = () => async (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USERS_READ_START })
  const q = query(collection(db, 'users'), orderBy('timestamp', 'asc'))
  await getDocs(q)
    .then((querySnapshot) => {
      let users: any = []
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
      })

      dispatch({ type: userType.USERS_READ_SUCCESS, payload: users })
    })
    .catch((error) => {
      dispatch({ type: userType.USERS_READ_ERROR, payload: error.message })
    })
}

export const userUpdate = (user: User) => async (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USER_UPDATE_START })

  await updateDoc(doc(db, 'users', user.id), {
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

export const usersUpdate = (user: User) => async (dispatch: Dispatch<userAction>) => {
  dispatch({ type: userType.USERS_UPDATE_START })
  try {
    dispatch({ type: userType.USERS_UPDATE_SUCCESS, payload: user })
  } catch (error) {
    dispatch({ type: userType.USERS_UPDATE_ERROR, payload: `${error}` })
  }
}
