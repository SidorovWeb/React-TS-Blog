import { LogoutIcon, UserIcon } from '@heroicons/react/solid'
import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User, userType } from '../../types/user'
import { isDefinitePath } from '../../utils'
import { Profile } from '../Profile/Profile'
import { MyButton } from '../UI/MyButton/MyButton'

interface MenuProps {
  user: User
}

export const Menu: FC<MenuProps> = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const onClick = () => {
    navigate('/')
    // const auth = getAuth()
    // signOut(auth)
    //   .then(() => {
    //     dispatch({
    //       type: userType.SET_USER,
    //       payload: null,
    //     })
    //     toast.success('Success')
    //     localStorage.removeItem('currentUser')
    //     navigate('/')
    //   })
    //   .catch((error) => toast.error(error.message))
  }

  return (
    <div className='relative font-bold'>
      {isDefinitePath(pathname) ? (
        <div className='flex items-center'>
          <div className='flex items-center'>
            <Profile user={user} />
          </div>
          <MyButton className='flex items-center p-2 ml-4 font-bold hover' onClick={onClick}>
            Выйти
            <LogoutIcon width={20} className='ml-2' />
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
