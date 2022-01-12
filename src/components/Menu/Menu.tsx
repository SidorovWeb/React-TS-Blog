import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { User, userType } from '../../types/user'

interface MenuProps {
  user: User
}

export const Menu: FC<MenuProps> = ({ user }) => {
  const dispatch = useDispatch()

  const onClick = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      dispatch({
        type: userType.SET_USER,
        payload: null,
      })
    })
  }

  return (
    <div className='relative font-bold'>
      <div>{user.userName}</div>
      <div className='absolute left-0 bottom-0 p-4 rounded-lg translate-y-full flex flex-col bg-white text-gray-700'>
        <Link className='' to={`/my-account`}>
          Кабинет
        </Link>
        <button className='font-bold' onClick={onClick}>
          Выйти
        </button>
      </div>
    </div>
  )
}
