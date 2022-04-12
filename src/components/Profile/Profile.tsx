import { UserIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { menu } from '../../store/action-creators/menuAction'
import { User } from '../../types/userTypes'

interface ProfileProps {
  user: User
  width?: string
  height?: string
}

export const Profile: FC<ProfileProps> = ({ user, width = '32px', height = '34px' }) => {
  const dispatch = useDispatch()

  return (
    <>
      <div
        className='bg-white rounded-full overflow-hidden shrink-0 flex items-center justify-center'
        style={{ width: width, height: height }}
        onClick={() => dispatch(menu(false))}
      >
        {user.userPhoto.url ? (
          <img className='w-full object-cover block h-full' src={user.userPhoto.url} alt={user.userName} />
        ) : (
          <UserIcon width={24} color='#2d2d2d' />
        )}
      </div>
    </>
  )
}
