import { FC } from 'react'
import { postListProps } from '../../types/postsTypes'
import { Link } from 'react-router-dom'
import { formatTimestamp } from '../../utils'

interface SidebarItemProps {
  post: postListProps
}

export const SidebarRecentPost: FC<SidebarItemProps> = ({ post }) => {
  return (
    <div className='flex items-center mt-4'>
      <Link className='w-16 h-16 rounded-xl overflow-hidden flex-shrink-0' to={`post/${post.slug}`}>
        <img src={post.previewImage.url} alt='author' className='img' loading='lazy' />
      </Link>
      <div className='flex-grow ml-4'>
        <p className='text-gray-400'>{formatTimestamp(post.timestamp)}</p>

        <Link className='text-lg truncate overflow-hidden block' style={{ width: '220px' }} to={`post/${post.slug}`}>
          {post.title}
        </Link>
      </div>
    </div>
  )
}
