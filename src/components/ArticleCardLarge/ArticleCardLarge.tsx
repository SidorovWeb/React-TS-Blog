import { FC } from 'react'
import { Link } from 'react-router-dom'
import { postListProps } from '../../types/postsTypes'
import { User } from '../../types/userTypes'
import { Profile } from '../Profile/Profile'

interface ArticleCardLargeProps {
  post: postListProps
  users: User[]
}

export const ArticleCardLarge: FC<ArticleCardLargeProps> = ({ post, users = [] }) => {
  const user = users.filter((u: User) => u.id === post.uid)[0]

  return (
    <div className='lg:rounded-lg overflow-hidden w-full block lg:flex justify-end bg-white shadow-lg dark:shadow-gray-50/10 relative text-left  mb-8 lg:mb-0 min-h-[422px] break-out'>
      {post.previewImage && (
        <Link
          className='overflow-hidden h-full absolute t-0 left-0 thumbnail-lg lg:thumbnail-gradient w-full lg:w-[55%]'
          style={{
            backgroundImage: `url(${post.previewImage.url})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          to={`/post/${post.slug}`}
        ></Link>
      )}

      <div className='flex flex-col justify-between w-full lg:w-1/2 px-6 lg:p-8 py-16 z-10 relative'>
        <Link
          className='text-2xl lg:text-4xl font-bold mb-10 hover:opacity-60 transition-all text-white lg:text-gray-900'
          to={`/post/${post.slug}`}
        >
          {post.title}
        </Link>
        <Link to={`/post/${post.slug}`}>
          <p className='text-white lg:text-gray-700 mb-10 font-bold text-base md:text-lg hover:opacity-60 transition-all'>
            {post.excerpt}
          </p>
        </Link>
        <div className='flex items-center font-bold'>
          {user && <Profile user={user} width={'34px'} height={'34px'} />}
          <div className='font-bold text-white lg:text-gray-700 ml-2'>{post.author}</div>
        </div>
      </div>
    </div>
  )
}
