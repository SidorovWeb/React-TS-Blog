import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isMyAccount } from '../../utils'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Menu } from '../Menu/Menu'

export const NavBar: FC = () => {
  const pathname = useLocation().pathname
  const { user } = useAuth()

  return (
    <div className='py-6 text-white border-b border-gray-500'>
      <div className='flex items-center justify-between'>
        {pathname === '/' ? (
          <Logo width='45px' textSize='text-4xl' />
        ) : (
          <Link to='/'>
            <Logo width='45px' textSize='text-4xl' />
          </Link>
        )}
        <div className='flex items-center'>
          <Navigation />
          {user ? (
            <Menu user={user} />
          ) : (
            !user &&
            isMyAccount(pathname) && (
              <Link className='btn py-2 ml-4' to={`login`}>
                Войти
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
