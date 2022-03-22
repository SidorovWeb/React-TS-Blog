import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'
import { isMyAccount } from '../../utils'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Menu } from '../Menu/Menu'
import { useSelector } from '../../hooks/useTypedSelector'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import useDarkMode from '../../hooks/useDarkMode'

export const NavBar: FC = () => {
  const pathname = useLocation().pathname
  const currentUser = useAuth()
  const { user } = useSelector((state) => state.user)
  const styles = isMyAccount(pathname) ? 'text-white' : 'py-4 text-white border-b border-gray-500'
  const [colorTheme, setTheme] = useDarkMode()

  return (
    <div className={styles}>
      <div className='flex items-center justify-between'>
        {isMyAccount(pathname) ? (
          <span className='text-3xl font-bold'>My account</span>
        ) : (
          <Logo width='45px' textSize='text-4xl' />
        )}

        <div className='flex items-center'>
          {!isMyAccount(pathname) && <Navigation />}

          {currentUser ? (
            <Menu user={user} />
          ) : !isMyAccount(pathname) && !currentUser && pathname !== '/' ? (
            <Link className='btn py-2 ml-4' to={`/`}>
              На главную
            </Link>
          ) : (
            <Link className='btn py-2 ml-4' to={`login`}>
              Войти
            </Link>
          )}
          {colorTheme === 'light' ? (
            <MoonIcon className='iconMoon cursor-pointer hover' width={24} onClick={() => setTheme(colorTheme)} />
          ) : (
            <SunIcon className='iconSun cursor-pointer hover' width={24} onClick={() => setTheme(colorTheme)} />
          )}
        </div>
      </div>
    </div>
  )
}
