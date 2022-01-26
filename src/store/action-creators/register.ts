import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { defaultUser } from '../../constants'
import { db } from '../../firebase'
import { registerAction, registerType, SignUpData } from '../../types/register'
import { userAction, userType } from '../../types/user'

export const createUser = (data: SignUpData) => (dispatch: Dispatch<registerAction | userAction>) => {
  dispatch({
    type: registerType.REGISTER_START,
  })
  createUserWithEmailAndPassword(getAuth(), data.email, data.password)
    .then((userCredential) => {
      const user = {
        ...defaultUser,
        userName: data.username,
        email: data.email,
        timestamp: serverTimestamp(),
        uid: userCredential.user.uid,
      }

      addDoc(collection(db, 'users'), user).then((newDate) => {
        dispatch({
          type: userType.SET_USER,
          payload: { ...user, id: newDate.id },
        })

        updateDoc(doc(db, 'users', newDate.id), { ...user, id: newDate.id })
          .then(() => {
            dispatch({ type: userType.UPDATE_USER, payload: { ...user, id: newDate.id } })
          })
          .catch((error) => {
            dispatch({ type: userType.SET_USER_ERROR, payload: error.message })
          })

        localStorage.setItem('currentUser', JSON.stringify({ ...user, id: newDate.id }))
      })

      dispatch({
        type: registerType.REGISTER_SUCCESS,
      })
      toast.success('Вы успешно зарегистрировались')
    })
    .catch((error) => {
      dispatch({ type: registerType.REGISTER_ERROR, payload: error.message })
      toast.error(error.message)
    })
}
