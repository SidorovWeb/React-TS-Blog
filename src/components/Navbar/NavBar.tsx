import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'

export const NavBar = () => {
  const pathname = useLocation().pathname

  return (
    <div className='py-6 text-white border-b border-gray-500'>
      <div className='flex items-center justify-between'>
        {pathname === '/' ? (
          <Logo height='34px' color='#61dafb' textSize='text-2xl' />
        ) : (
          <Link to='/'>
            <Logo height='34px' color='#61dafb' textSize='text-2xl' />
          </Link>
        )}

        <div className='flex items-center'>
          <Navigation />
          {pathname !== '/login' && (
            <Link className='btn py-2 ml-4' to={`login`}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
