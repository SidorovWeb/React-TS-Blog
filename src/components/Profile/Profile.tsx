import { UserIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface ProfileProps {
  author?: string
  authorPhotoUrl?: string
  width?: string
  height?: string
}

export const Profile: FC<ProfileProps> = ({ author, authorPhotoUrl, width = '32px', height = '34px' }) => {
  return (
    <>
      <div
        className='bg-gray-100 rounded-full overflow-hidden shrink-0 flex items-center justify-center'
        style={{ width: width, height: height }}
      >
        {authorPhotoUrl ? (
          <img className='w-full object-cover block h-full' src={authorPhotoUrl} alt={author} />
        ) : (
          <UserIcon width={24} color='#2d2d2d' />
        )}
      </div>
    </>
  )
}
