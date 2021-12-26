import { Home } from '../pages/Home'
import { Contacts } from '../pages/Contacts'
import { Navigate } from 'react-router-dom'
import { PostIdPage } from '../pages/PostIdPage'
import { Categories } from '../pages/Categories'
import { CategoriesSlugPage } from '../pages/CategoriesSlugPage'
import { ArchivesPosts } from '../pages/ArchivesPosts'
import { Login } from '../pages/Login'

export const routes = [
  { path: '/', element: <Home />, exact: true },
  { path: 'login', element: <Login />, exact: true },
  { path: 'contacts', element: <Contacts />, exact: true },
  { path: 'archives', element: <ArchivesPosts />, exact: true },
  { path: 'post/:id', element: <PostIdPage /> },
  { path: 'categories', element: <Categories />, exact: true },
  { path: 'category/:slug', element: <CategoriesSlugPage /> },
  { path: '*', element: <Navigate replace to='/' />, exact: true },
]
