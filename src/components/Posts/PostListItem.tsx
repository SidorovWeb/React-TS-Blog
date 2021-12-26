import { CalendarIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/types'
import { TheButton } from '../UI/TheButton/TheButton'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  return (
    <div className='rounded-lg overflow-hidden bg-white shadow-lg mb-8 p-8 text-left'>
      <Link className='mb-8 rounded-lg overflow-hidden' to={`post/${post.id}`}>
        <img className='max-h-80 img' src={post.previewImage} alt='Изображение' />
      </Link>
      <Link className='text-black text-4xl font-bold mb-10 text-center' to={`post/${post.id}`}>
        {post.title}
      </Link>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <div className='w-14 h-14 rounded-full overflow-hidden mr-4'>
            <img src={post.authorPhoto} alt={post.author} className='img' />
          </div>
          {/* <UserIcon className='icon text-pink-600' /> */}
          <p className='text-gray-700 font-bold mt-1'>{post.author}</p>
        </div>

        <div className='flex items-center'>
          <CalendarIcon className='icon text-pink-600' />
          <p className='text-gray-700 font-bold mt-1'>{post.dateOfCreation}</p>
        </div>
      </div>

      <div>
        <p className='text-gray-700 mb-10 font-normal text-lg'>{post.excerpt}</p>
      </div>
      <div className='flex items-center justify-center mb-6'>
        <Link to={`post/${post.id}`}>
          <TheButton className='btn text-xl py-4'>Продолжить чтение</TheButton>
        </Link>
      </div>
    </div>
  )
}
