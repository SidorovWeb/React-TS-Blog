import { Home } from '../pages/Home'
import { Contacts } from '../pages/Contacts'
import { Navigate } from 'react-router-dom'
import { PostIdPage } from '../pages/PostIdPage'
import { Categories } from '../pages/Categories'
import { CategoriesSlugPage } from '../pages/CategoriesSlugPage'
import { ArchivesPosts } from '../pages/ArchivesPosts'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const routes = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'contacts', element: <Contacts /> },
  { path: 'archives', element: <ArchivesPosts /> },
  { path: 'post/:id', element: <PostIdPage /> },
  { path: 'categories', element: <Categories /> },
  { path: 'category/:slug', element: <CategoriesSlugPage /> },
  { path: '*', element: <Navigate replace to='/' /> },
]
