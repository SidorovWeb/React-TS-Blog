import { Logo } from '../Logo/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isMyAccount } from '../../utils'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Menu } from '../Menu/Menu'
import { useSelector } from '../../hooks/useTypedSelector'
import { MenuIcon, XIcon } from '@heroicons/react/solid'
import { ThemeSwitcher } from '../UI/ThemeSwitcher/ThemeSwitcher'
import { HomeIcon, UserIcon } from '@heroicons/react/outline'
import { useActions } from '../../hooks/useActions'

export const NavBar: FC = () => {
  const pathname = useLocation().pathname
  const currentUser = useAuth()
  const isPath = !isMyAccount(pathname) && !currentUser && pathname !== '/'
  const { user } = useSelector((state) => state.user)
  const { open } = useSelector((state) => state.menu)
  const { menu } = useActions()
  const navigate = useNavigate()

  const onClickMenu = () => {
    menu(false)
  }

  return (
    <div className='flex items-center'>
      {isMyAccount(pathname) ? (
        <Link className='text-lg md:text-3xl font-bold mr-auto' to={'/my-account/home'}>
          My account
        </Link>
      ) : (
        <Logo />
      )}

      {!isMyAccount(pathname) && (
        <div className={`${open ? 'block' : 'hidden'} lg:block fade menu cursor-pointer`} onClick={() => menu(!open)}>
          <div className='items-start hidden lg:flex menu__content cursor-default' onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col lg:flex-row order-1 lg:-order-none mt-6 lg:mt-0 mr-2'>
              <Link className='font-bold py-2 px-2 hover:opacity-60 transition-opacity' to='/' onClick={onClickMenu}>
                Главная
              </Link>
              <Link
                className='font-bold py-2 px-2 hover:opacity-60 transition-opacity'
                to='/archives'
                onClick={onClickMenu}
              >
                Статьи
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className='flex items-center z-[1002]'>
        {currentUser ? (
          <Menu user={user} />
        ) : (
          <div
            className='p-1 cursor-pointer flex justify-center'
            onClick={() => {
              isPath ? navigate('/') : navigate('login')
              menu(false)
            }}
          >
            <UserIcon width={24} />
          </div>
        )}
        {isMyAccount(pathname) && (
          <div
            className='p-1 cursor-pointer flex justify-center'
            onClick={() => {
              navigate('/')
              menu(false)
            }}
          >
            <HomeIcon width={24} />
          </div>
        )}
        <ThemeSwitcher />
      </div>

      <div className='block lg:hidden cursor-pointer z-[1000]' onClick={() => menu(!open)}>
        {open ? <XIcon width={30} /> : <MenuIcon width={30} />}
      </div>
    </div>
  )
}
