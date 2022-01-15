import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Dispatch } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase'
import { loginAction, loginType, SignInData } from '../../types/login'
import { User, userAction, userType } from '../../types/user'

export const login = (data: SignInData) => (dispatch: Dispatch<loginAction | userAction>) => {
  dispatch({
    type: loginType.LOGIN_START,
  })

  signInWithEmailAndPassword(getAuth(), data.email, data.password)
    .then(async (userCredential) => {
      const auth = getAuth()
      const uid = auth?.currentUser?.uid

      const q = query(collection(db, 'users'), where('id', '==', uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        dispatch({
          type: userType.SET_USER,
          payload: { ...doc.data() } as User,
        })
        toast.success('Success')
        localStorage.setItem('currentUser', JSON.stringify({ ...doc.data() }))
      })

      dispatch({
        type: loginType.LOGIN_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: loginType.LOGIN_ERROR,
        payload: error.message,
      })
      toast.error(error.message)
    })
}
