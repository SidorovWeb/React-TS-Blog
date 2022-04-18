import { BookOpenIcon, CogIcon, TemplateIcon, ClipboardListIcon, UserGroupIcon } from '@heroicons/react/solid'
import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActions } from '../../hooks/useActions'
import { useSelector } from '../../hooks/useTypedSelector'
import { User } from '../../types/userTypes'
import { MyButton } from '../UI/MyButton/MyButton'
import { DashboardDrawerItem } from './DashboardDrawerItem'

interface DashboardDrawerProps {
  user: User
}

export const DashboardDrawer: FC<DashboardDrawerProps> = ({ user }) => {
  const { open } = useSelector((state) => state.menu)
  const navigate = useNavigate()
  const { menu } = useActions()

  const onLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser')
        navigate('/')
        menu(!open)
        toast.success('Вы успешно вышли')
      })
      .catch((error) => toast.error(error.message))
  }

  return (
    <div
      className={`${open ? 'block' : 'hidden'} xl:w-60 flex-shrink-0 lg:flex fade menu cursor-pointer`}
      onClick={() => menu(!open)}
    >
      <div
        className='w-full menu__content lg:flex flex-col pr-6 pt-24 dashboard-drawer__list cursor-default'
        onClick={(e) => e.stopPropagation()}
      >
        <NavLink to={'/my-account/home'} onClick={() => menu(!open)}>
          <DashboardDrawerItem activeItem={true}>
            <TemplateIcon width={22} /> <span className='ml-2'>Главная</span>
          </DashboardDrawerItem>
        </NavLink>
        <NavLink to={'/my-account/posts'} onClick={() => menu(!open)}>
          <DashboardDrawerItem activeItem={false}>
            <BookOpenIcon width={22} /> <span className='ml-2'>Мои посты</span>
          </DashboardDrawerItem>
        </NavLink>
        <NavLink to={'/my-account/tools'} onClick={() => menu(!open)}>
          <DashboardDrawerItem activeItem={false}>
            <CogIcon width={22} /> <span className='ml-2'>Настройки</span>
          </DashboardDrawerItem>
        </NavLink>
        {user.status === 'admin' && <div className='border mb-2'></div>}

        {user.status === 'admin' && (
          <NavLink to={'/my-account/all_posts'} onClick={() => menu(!open)}>
            <DashboardDrawerItem activeItem={false}>
              <ClipboardListIcon width={22} /> <span className='ml-2'>All posts</span>
            </DashboardDrawerItem>
          </NavLink>
        )}
        {user.status === 'admin' && (
          <NavLink to={'/my-account/all_users'} onClick={() => menu(!open)}>
            <DashboardDrawerItem activeItem={false}>
              <UserGroupIcon width={22} /> <span className='ml-2'>All users</span>
            </DashboardDrawerItem>
          </NavLink>
        )}

        <MyButton
          className='mt-6 font-bold text-red-600 py-2 px-4 w-full bg-red-600/25 hover:bg-red-600 hover:text-white rounded-lg transition-all'
          onClick={onLogout}
        >
          Выйти
        </MyButton>
      </div>
    </div>
  )
}
