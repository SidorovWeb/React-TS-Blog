import { BookOpenIcon, CogIcon, TemplateIcon, ClipboardListIcon, UserGroupIcon } from '@heroicons/react/solid'
import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { defaultUser } from '../../constants'
import { useSelector } from '../../hooks/useTypedSelector'
import { menu } from '../../store/action-creators/menuAction'
import { User, userType } from '../../types/userTypes'
import { MyButton } from '../UI/MyButton/MyButton'
import { DashboardDrawerItem } from './DashboardDrawerItem'

interface DashboardDrawerProps {
  user: User
}

export const DashboardDrawer: FC<DashboardDrawerProps> = ({ user }) => {
  const { open } = useSelector((state) => state.menu)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser')
        dispatch({
          type: userType.USER_READ_SUCCESS,
          payload: defaultUser,
        })
        navigate('/')
        dispatch(menu(!open))
        toast.success('Вы успешно вышли')
      })
      .catch((error) => toast.error(error.message))
  }

  return (
    <div
      className={`${open ? 'block' : 'hidden'} xl:w-60 flex-shrink-0 lg:flex menu cursor-pointer`}
      onClick={() => dispatch(menu(!open))}
    >
      <div
        className='w-full menu__content lg:flex flex-col pr-6 pt-24 dashboard-drawer__list cursor-default'
        onClick={(e) => e.stopPropagation()}
      >
        <NavLink to={'/my-account/home'} onClick={() => dispatch(menu(!open))}>
          <DashboardDrawerItem activeItem={true}>
            <TemplateIcon width={22} /> <span className='ml-2'>Главная</span>
          </DashboardDrawerItem>
        </NavLink>
        <NavLink to={'/my-account/posts'} onClick={() => dispatch(menu(!open))}>
          <DashboardDrawerItem activeItem={false}>
            <BookOpenIcon width={22} /> <span className='ml-2'>Мои посты</span>
          </DashboardDrawerItem>
        </NavLink>
        <NavLink to={'/my-account/tools'} onClick={() => dispatch(menu(!open))}>
          <DashboardDrawerItem activeItem={false}>
            <CogIcon width={22} /> <span className='ml-2'>Настройки</span>
          </DashboardDrawerItem>
        </NavLink>
        {user.status === 'admin' && <div className='border mb-2'></div>}

        {user.status === 'admin' && (
          <NavLink to={'/my-account/all_posts'} onClick={() => dispatch(menu(!open))}>
            <DashboardDrawerItem activeItem={false}>
              <ClipboardListIcon width={22} /> <span className='ml-2'>All posts</span>
            </DashboardDrawerItem>
          </NavLink>
        )}
        {user.status === 'admin' && (
          <NavLink to={'/my-account/all_users'} onClick={() => dispatch(menu(!open))}>
            <DashboardDrawerItem activeItem={false}>
              <UserGroupIcon width={22} /> <span className='ml-2'>All users</span>
            </DashboardDrawerItem>
          </NavLink>
        )}

        <MyButton
          className='mt-auto font-bold text-red-600 py-2 px-4 w-full hover:bg-red-600 hover:text-white rounded-lg transition-all'
          onClick={onLogout}
        >
          Выйти
        </MyButton>
      </div>
    </div>
  )
}
