import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { db } from './firebase'
import { Layout } from './layout/Layout'
import { postsRead } from './store/action-creators/postAction'
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

    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const uid = user.uid
        const q = query(collection(db, 'users'), where('uid', '==', uid))
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            dispatch({
              type: userType.SET_USER,
              payload: { ...doc.data() } as User,
            })
            localStorage.setItem('currentUser', JSON.stringify({ ...doc.data() }))
          })
        })
      }
    })

    dispatch(postsRead())

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
