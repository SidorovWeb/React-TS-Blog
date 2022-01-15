import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { privateRoutes, publicRoutes } from '../../router/router'

export const AppRouter = () => {
  const { user } = useAuth()
  const userLocalDate = localStorage.getItem('currentUser')

  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route {...route} key={idx.toString()}></Route>
      ))}
      {privateRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={userLocalDate || user ? route.element : <Navigate replace to='/' />}
          key={idx.toString()}
        >
          {route.children &&
            route.children.map((child, index) => (
              <Route path={child.path} element={child.element} key={index.toString()}></Route>
            ))}
        </Route>
      ))}
    </Routes>
  )
}
