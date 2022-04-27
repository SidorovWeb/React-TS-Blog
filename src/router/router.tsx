import { Home } from '../pages/Home'
import { Navigate } from 'react-router-dom'
import { PostPage } from '../pages/PostPage'
import { MyAccount } from '../pages/MyAccount'
import { Archive } from '../pages/Archive'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { DashboardHome } from '../components/Dashboard/Home/DashboardHome'
import { DashboardMyPosts } from '../components/Dashboard/MyPosts/DashboardMyPosts'
import { DashboardAllPosts } from '../components/Dashboard/AllPosts/DashboardAllPosts'
import { DashboardAllUsers } from '../components/Dashboard/AllUsers/DashboardAllUsers'
import { DashboardTools } from '../components/Dashboard/Tools/DashboardTools'
import { Editor } from '../components/Dashboard/Editor/Editor'

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'archives', element: <Archive /> },
  { path: 'post/:slug', element: <PostPage /> },
  { path: '*', element: <Navigate replace to='/' /> },
]
export const privateRoutes = [
  {
    path: '/my-account',
    element: <MyAccount />,
    children: [
      { path: 'home', element: <DashboardHome /> },
      { path: 'posts', element: <DashboardMyPosts /> },
      { path: 'all_posts', element: <DashboardAllPosts /> },
      { path: 'all_users', element: <DashboardAllUsers /> },
      { path: 'tools', element: <DashboardTools /> },
      { path: 'editor', element: <Editor /> },
      { path: 'editor/:id', element: <Editor /> },
    ],
  },
]
