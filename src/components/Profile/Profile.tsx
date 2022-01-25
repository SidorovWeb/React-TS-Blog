import { UserIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { User } from '../../types/user'

interface ProfileProps {
  user: User
}

export const Profile: FC<ProfileProps> = ({ user }) => {
  return (
    <>
      {user.userPhoto ? (
        <div className='bg-white w-8 h-8 rounded-lg overflow-hidden shrink-0'>
          <img src={user.userPhoto} alt={user.userName} />
        </div>
      ) : (
        <div className='bg-white w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center'>
          <UserIcon width={24} color='#2d2d2d' />
        </div>
      )}
    </>
  )
}
