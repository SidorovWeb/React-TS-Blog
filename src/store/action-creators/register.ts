import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
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
        id: userCredential.user.uid,
      }

      addDoc(collection(db, 'users'), user)
      dispatch({
        type: userType.SET_USER,
        payload: user,
      })
      dispatch({
        type: registerType.REGISTER_SUCCESS,
      })
      toast.success('Регистрация прошла успешно')
    })
    .catch((error) => {
      dispatch({ type: registerType.REGISTER_ERROR, payload: error.message })
      toast.error(error.message)
    })
}
