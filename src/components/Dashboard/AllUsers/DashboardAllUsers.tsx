import { UserIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { Profile } from '../../Profile/Profile'

export const DashboardAllUsers: FC = () => {
  const { users } = useSelector((state) => state.user)

  return (
    <div className='flex-grow font-bold'>
      <div className='grid grid-cols-3 gap-5 mb-5 text-lg px-2 text-slate-700'>
        <div>Фото</div>
        <div>Имя</div>
        <div>Email</div>
      </div>
      {users.map((user) => (
        <div className='grid grid-cols-3 gap-5 bg-slate-100 mb-3 p-2 rounded-lg' key={user.uid}>
          <Profile user={user} width={'34px'} height={'34px'} />
          <div className='mr-2 flex items-center'>{user.userName}</div>
          <div className='flex items-center'>{user.email}</div>
        </div>
      ))}
    </div>
  )
}
