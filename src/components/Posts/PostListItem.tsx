import { CalendarIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/postsTypes'
import { formatTimestamp } from '../../utils'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-white shadow-lg mb-4 px-8 py-4 text-left border border-gray-400'>
      <div className='flex mt-auto items-center justify-between'>
        <div className='flex items-center mb-4'>
          <Link
            className='w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden mr-4 hover:opacity-60 transition-all'
            to={`/post/${post.slug}`}
          >
            <img src={post.authorPhoto} alt={post.author} className='img' loading='lazy' />
          </Link>
          <Link className='text-gray-700 font-bold mt-1 hover:opacity-60 transition-all' to={`/post/${post.slug}`}>
            {post.author}
          </Link>
        </div>

        <div className='flex items-center'>
          <CalendarIcon className='icon text-gray-700' />
          <p className='text-gray-700 font-bold mt-1'>{formatTimestamp(post.timestamp)}</p>
        </div>
      </div>
      <div className='flex items-start justify-between'>
        <Link
          className='block text-black text-3xl font-bold mb-10 hover:opacity-60 transition-all mr-20'
          to={`/post/${post.slug}`}
        >
          {post.title}
        </Link>
        <Link
          className='mb-8 rounded-lg overflow-hidden block relative thumbnail-gradient-before aspect-video w-32 h-32 md:max-h-80 shrink'
          to={`/post/${post.slug}`}
        >
          <img className='img' src={post.previewImage.url} alt='Изображение' loading='lazy' />
        </Link>
      </div>

      <div>
        <p className='text-gray-700 mb-10 font-bold text-lg'>{post.excerpt}</p>
      </div>
    </div>
  )
}
