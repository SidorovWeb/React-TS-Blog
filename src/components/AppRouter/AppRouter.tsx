import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { privateRoutes, publicRoutes } from '../../router/router'

export const AppRouter = () => {
  const { user } = useAuth()

  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route {...route} key={idx.toString()}></Route>
      ))}
      {privateRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={user ? route.element : <Navigate replace to='/' />}
          key={idx.toString()}
        ></Route>
      ))}
    </Routes>
  )
}
