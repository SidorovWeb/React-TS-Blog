import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Dispatch } from 'redux'
import { defaultUser } from '../../constants'
import { db } from '../../firebase'
import { registerAction, registerType, SignUpData } from '../../types/registerTypes'
import { userAction, userType } from '../../types/userTypes'

export const createUser = (data: SignUpData) => async (dispatch: Dispatch<registerAction | userAction>) => {
  dispatch({
    type: registerType.REGISTER_START,
  })
  await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
    .then((userCredential) => {
      const user = {
        ...defaultUser,
        userName: data.username,
        email: data.email,
        timestamp: serverTimestamp(),
        uid: userCredential.user.uid,
        status: data.email === 'admin@info.ru' ? 'admin' : 'user',
      }

      addDoc(collection(db, 'users'), user).then((newDate) => {
        dispatch({
          type: userType.USER_READ_SUCCESS,
          payload: { ...user, id: newDate.id },
        })

        updateDoc(doc(db, 'users', newDate.id), { ...user, id: newDate.id })
          .then(() => {
            dispatch({ type: userType.USER_UPDATE_SUCCESS, payload: { ...user, id: newDate.id } })
          })
          .catch((error) => {
            dispatch({ type: userType.USER_READ_ERROR, payload: error.message })
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
