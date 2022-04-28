import { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { Profile } from '../../Profile/Profile'
import { DashboardContainerContent } from '../DashboardContainerContent'

export const DashboardAllUsers: FC = () => {
  const { users } = useSelector((state) => state.user)

  return (
    <DashboardContainerContent>
      <div className='mr-4 text-xl mb-6'>Все пользователи</div>
      <div className='hidden md:grid grid-cols-3 gap-5 mb-5 text-lg px-2'>
        <div>Фото</div>
        <div>Имя</div>
        <div>Email</div>
      </div>
      {users.map((user) => (
        <div
          className='grid md:grid-cols-3 gap-5 bg-blue-100 mt-4 px-2 py-4 rounded-lg text-gray-900 shadow-lg'
          key={user.uid}
        >
          <Profile authorPhotoUrl={user.userPhoto.url} author={user.userName} width={'34px'} height={'34px'} />
          <div className='mr-2 flex items-center'>{user.userName}</div>
          <div className='flex items-center'>{user.email}</div>
        </div>
      ))}
    </DashboardContainerContent>
  )
}
