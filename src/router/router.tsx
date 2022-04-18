import { Home } from '../components/Home/Home'
import { Navigate } from 'react-router-dom'
import { PostIdPage } from '../components/PostIdPage/PostIdPage'
import { MyAccount } from '../components/MyAccount/MyAccount'
import { ArchivesPosts } from '../components/ArchivesPosts/ArchivesPosts'
import { Login } from '../components/Auth/Login'
import { Register } from '../components/Auth/Register'
import { DashboardHome } from '../components/MyAccount/Dashboard/Home/DashboardHome'
import { DashboardMyPosts } from '../components/MyAccount/Dashboard/MyPosts/DashboardMyPosts'
import { DashboardAllPosts } from '../components/MyAccount/Dashboard/AllPosts/DashboardAllPosts'
import { DashboardAllUsers } from '../components/MyAccount/Dashboard/AllUsers/DashboardAllUsers'
import { DashboardTools } from '../components/MyAccount/Dashboard/Tools/DashboardTools'
import { Editor } from '../components/MyAccount/Dashboard/Editor/Editor'

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'archives', element: <ArchivesPosts /> },
  { path: 'archives/:slug', element: <ArchivesPosts /> },
  { path: 'post/:slug', element: <PostIdPage /> },
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
