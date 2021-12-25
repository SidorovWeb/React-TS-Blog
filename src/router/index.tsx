import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { Contacts } from '../pages/Contacts'
import { Navigate } from 'react-router-dom'
import { PostIdPage } from '../pages/PostIdPage'

export const routes = [
  { path: '/', element: <Home />, exact: true },
  { path: 'about', element: <About />, exact: true },
  { path: 'contacts', element: <Contacts />, exact: true },
  { path: 'post/:id', element: <PostIdPage /> },
  { path: '*', element: <Navigate replace to='/' />, exact: true },
]
