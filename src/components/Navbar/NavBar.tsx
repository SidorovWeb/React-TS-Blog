import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'
import { isMyAccount } from '../../utils'
import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Menu } from '../Menu/Menu'

export const NavBar: FC = () => {
  const pathname = useLocation().pathname
  const { user } = useAuth()
  const styles = pathname !== '/my-account' ? 'py-4 text-white border-b border-gray-500' : 'text-white'

  return (
    <div className={styles}>
      <div className='flex items-center justify-between'>
        {pathname !== '/my-account' ? (
          <Logo width='45px' textSize='text-4xl' />
        ) : (
          <span className='text-3xl font-bold'>My account</span>
        )}

        <div className='flex items-center'>
          {pathname !== '/my-account' && <Navigation />}

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
