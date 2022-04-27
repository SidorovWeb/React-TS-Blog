import { UserIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useActions } from '../../hooks/useActions'
import { User } from '../../types/userTypes'

interface ProfileProps {
  user: User
  width?: string
  height?: string
}

export const Profile: FC<ProfileProps> = ({ user = null, width = '32px', height = '34px' }) => {
  const { menu } = useActions()

  return (
    <>
      <div
        className='bg-gray-100 rounded-full overflow-hidden shrink-0 flex items-center justify-center'
        style={{ width: width, height: height }}
        onClick={() => menu(false)}
      >
        {user && user.userPhoto.url ? (
          <img className='w-full object-cover block h-full' src={user.userPhoto.url} alt={user.userName} />
        ) : (
          <UserIcon width={24} color='#2d2d2d' />
        )}
      </div>
    </>
  )
}
