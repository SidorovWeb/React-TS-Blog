import { BellIcon, HomeIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../types/userTypes'
import { isMyAccount } from '../../utils'
import { Profile } from '../Profile/Profile'
import { MyButton } from '../UI/MyButton/MyButton'

interface MenuProps {
  user: User
}

export const Menu: FC<MenuProps> = ({ user }) => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const onClick = () => {
    navigate('/')
  }

  return (
    <div className='relative font-bold'>
      {isMyAccount(pathname) ? (
        <div className='flex items-center'>
          <div className='flex items-center'>
            <Profile user={user} />
          </div>
          <MyButton className='flex items-center p-2  font-bold hover' onClick={onClick}>
            <BellIcon width={24} className='ml-2' />
          </MyButton>
          <MyButton className='flex items-center p-2 font-bold hover' onClick={onClick}>
            <HomeIcon width={24} className='' />
          </MyButton>
        </div>
      ) : (
        <Link className='flex items-center' to={`/my-account/home`}>
          <Profile user={user} />
        </Link>
      )}
    </div>
  )
}
