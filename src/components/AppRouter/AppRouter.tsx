import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../../router/router'

export const AppRouter = () => {
  const isAuth = false

  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route {...route} key={idx.toString()}></Route>
      ))}
      {privateRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={isAuth ? route.element : <Navigate replace to='/login' />}
          key={idx.toString()}
        ></Route>
      ))}
    </Routes>
  )
}
