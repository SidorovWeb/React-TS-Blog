import { CalendarIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/types'
import { MyButton } from '../UI/MyButton/MyButton'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  return (
    <div className='rounded-lg overflow-hidden bg-white shadow-lg mb-8 p-8 text-left'>
      <Link className='mb-8 rounded-lg overflow-hidden block relative thumbnail-gradient-before' to={`post/${post.id}`}>
        <img className='max-h-80 img' src={post.previewImage} alt='Изображение' />
      </Link>
      <Link
        className='block text-black text-3xl font-bold mb-10 hover:opacity-60 transition-all'
        to={`post/${post.id}`}
      >
        {post.title}
      </Link>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <Link
            className='w-14 h-14 rounded-full overflow-hidden mr-4 hover:opacity-60 transition-all'
            to={`post/${post.id}`}
          >
            <img src={post.authorPhoto} alt={post.author} className='img' />
          </Link>
          <Link className='text-gray-700 font-bold mt-1 hover:opacity-60 transition-all' to={`post/${post.id}`}>
            {post.author}
          </Link>
        </div>

        <div className='flex items-center'>
          <CalendarIcon className='icon text-pink-600' />
          <p className='text-gray-700 font-bold mt-1'>{post.dateOfCreation}</p>
        </div>
      </div>

      <div>
        <p className='text-gray-700 mb-10 font-normal text-lg'>{post.excerpt}</p>
      </div>
      {/* <div className='flex items-center justify-center mb-6'>
        <Link to={`post/${post.id}`}>
          <MyButton className='btn text-xl py-4'>Продолжить чтение</MyButton>
        </Link>
      </div> */}
    </div>
  )
}
