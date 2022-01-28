import { UserIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { User } from '../../types/userTypes'

interface ProfileProps {
  user: User
  width?: string
  height?: string
}

export const Profile: FC<ProfileProps> = ({ user, width = '34px', height = '34px' }) => {
  return (
    <>
      {user.userPhoto ? (
        <div className='bg-white rounded-lg overflow-hidden shrink-0' style={{ width: width, height: height }}>
          <img className='w-full object-cover  h-full' src={user.userPhoto} alt={user.userName} />
        </div>
      ) : (
        <div
          className='bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center'
          style={{ width: width, height: height }}
        >
          <UserIcon width={24} color='#2d2d2d' />
        </div>
      )}
    </>
  )
}
