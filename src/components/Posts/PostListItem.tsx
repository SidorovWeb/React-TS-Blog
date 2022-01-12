import { CalendarIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/posts'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-white shadow-lg mb-8 p-4 text-left'>
      <Link
        className='mb-8 rounded-lg overflow-hidden block relative thumbnail-gradient-before aspect-video max-h-80 '
        to={`/post/${post.slug}`}
      >
        <img className='img' src={post.previewImage} alt='Изображение' />
      </Link>
      <Link
        className='block text-black text-3xl font-bold mb-10 hover:opacity-60 transition-all'
        to={`/post/${post.slug}`}
      >
        {post.title}
      </Link>
      <div>
        <p className='text-gray-700 mb-10 font-normal text-lg'>{post.excerpt}</p>
      </div>
      <div className='flex mt-auto items-center justify-between'>
        <div className='flex items-center'>
          <Link
            className='w-10 h-10 flex-shrink-0 rounded-full overflow-hidden mr-4 hover:opacity-60 transition-all'
            to={`/post/${post.slug}`}
          >
            <img src={post.authorPhoto} alt={post.author} className='img' />
          </Link>
          <Link className='text-gray-700 font-bold mt-1 hover:opacity-60 transition-all' to={`/post/${post.slug}`}>
            {post.author}
          </Link>
        </div>

        <div className='flex items-center'>
          <CalendarIcon className='icon text-pink-600' />
          <p className='text-gray-700 font-bold mt-1'>{post.dateOfCreation}</p>
        </div>
      </div>
      {/* <div className='flex items-center justify-center mb-6'>
        <Link to={`post/${post.slug}`}>
          <MyButton className='btn text-xl py-4'>Продолжить чтение</MyButton>
        </Link>
      </div> */}
    </div>
  )
}
