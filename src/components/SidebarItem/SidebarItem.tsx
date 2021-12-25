import { FC } from 'react'
import { IPostListProps } from '../../types/types'
import { Link } from 'react-router-dom'

interface SidebarItemProps {
  post: IPostListProps
}

export const SidebarItem: FC<SidebarItemProps> = ({ post }) => {
  return (
    <div className='flex items-center mt-4'>
      <Link className='w-16 h-16 rounded-xl overflow-hidden flex-shrink-0' to={`post/${post.id}`}>
        <img src={post.previewImage} alt='author' className='img' />
      </Link>
      <div className='flex-grow ml-4'>
        <p className='text-gray-400'>{post.dateOfCreation}</p>

        <Link className='truncate overflow-hidden block' style={{ width: '220px' }} to={`post/${post.id}`}>
          {post.title}
        </Link>
      </div>
    </div>
  )
}
