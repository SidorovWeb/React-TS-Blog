import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { db } from './firebase'
import { Layout } from './layout/Layout'
import { User, userType } from './types/user'

const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: userType.SET_USER_START,
    })
    const userLocalDate = localStorage.getItem('currentUser')
    if (userLocalDate) {
      dispatch({
        type: userType.SET_USER,
        payload: { ...JSON.parse(userLocalDate) } as User,
      })
    }

    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const uid = user.uid
        const q = query(collection(db, 'users'), where('id', '==', uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          dispatch({
            type: userType.SET_USER,
            payload: { ...doc.data() } as User,
          })
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
