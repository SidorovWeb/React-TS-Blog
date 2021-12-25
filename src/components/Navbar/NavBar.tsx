import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { TheButton } from '../UI/TheButton/TheButton'
import { Link, useLocation } from 'react-router-dom'

export const NavBar = () => {
  const Navigate = useLocation()

  return (
    <div className='py-6 text-white border-b border-blue-400'>
      <div className='flex items-center justify-between'>
        {Navigate.pathname === '/' ? (
          <Logo height='34px' color='#61dafb' textSize='text-2xl' />
        ) : (
          <Link to='/'>
            <Logo height='34px' color='#61dafb' textSize='text-2xl' />
          </Link>
        )}

        <div className='flex items-center'>
          <Navigation />
          <TheButton className='btn py-2 ml-4'>Войти</TheButton>
        </div>
      </div>
    </div>
  )
}
