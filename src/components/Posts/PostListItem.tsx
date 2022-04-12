import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/postsTypes'
import { User } from '../../types/userTypes'
import { Profile } from '../Profile/Profile'
import { ReactComponent as ShapeAvatar } from '../../icons/shape-avatar.svg'
import { formatTimestamp } from '../../utils'

interface PostItemPost {
  post: IPostListProps
  users?: User[]
}

export const PostItem: FC<PostItemPost> = ({ post, users = [] }) => {
  const user = users.filter((u: User) => u.id === post.uid)[0]

  return (
    <div className='flex flex-col rounded-lg overflow-hidden  shadow-lg mb-4  text-left'>
      <div className='calc75 relative'>
        <Link
          className='mb-8  overflow-hidden block shrink-0 absolute top-0 left-0 h-full w-full object-cover'
          to={`/post/${post.slug}`}
        >
          <img className='img ' src={post.previewImage.url} alt='Изображение' loading='lazy' />
        </Link>
        <span className='absolute -bottom-4 z-9 select-none'>
          <ShapeAvatar width={80} height={36} />
        </span>
        <div className='absolute -bottom-5 left-6 z-10 select-none'>
          {user && <Profile user={user} width={'34px'} height={'34px'} />}
        </div>
      </div>

      <div className='px-3 md:px-8 py-8 bg-white h-full'>
        <div className='text-gray-700 mb-2'>{formatTimestamp(post.timestamp)}</div>
        <Link
          className='block text-black text-xl lg:text-2xl font-bold mb-6 hover:opacity-60 transition-all max-w-xl 2xl:max-w-2xl'
          to={`/post/${post.slug}`}
        >
          {post.title}
        </Link>

        <Link className='text-gray-700 font-bold hover:opacity-60 transition-all' to={`/post/${post.slug}`}>
          {post.excerpt}
        </Link>
      </div>
    </div>
  )
}
