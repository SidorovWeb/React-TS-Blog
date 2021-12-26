import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../router/router'

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route {...route} key={idx.toString()}></Route>
      ))}
    </Routes>
  )
}
