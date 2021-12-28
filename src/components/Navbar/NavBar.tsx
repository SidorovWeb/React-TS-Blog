import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'
import { isMyAccount } from '../../utils'

export const NavBar = () => {
  const pathname = useLocation().pathname

  return (
    <div className='py-6 text-white border-b border-gray-500'>
      <div className='flex items-center justify-between'>
        {pathname === '/' ? (
          <Logo height='40px' color='#61dafb' textSize='text-4xl' />
        ) : (
          <Link to='/'>
            <Logo height='40px' color='#61dafb' textSize='text-4xl' />
          </Link>
        )}

        <div className='flex items-center'>
          <Navigation />
          {isMyAccount(pathname) && (
            <Link className='btn py-2 ml-4' to={`login`}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
