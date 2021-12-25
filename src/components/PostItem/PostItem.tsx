import { CalendarIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPostListProps } from '../../types/types'
import { TheButton } from '../UI/TheButton/TheButton'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate(`post/${post.id}`)
  }

  return (
    <div className='rounded-lg overflow-hidden bg-white shadow-lg mb-8 p-8'>
      <div className='mb-8 rounded-lg overflow-hidden'>
        <img className='max-h-80 img' onClick={navigateHandler} src={post.previewImage} alt='Изображение' />
      </div>
      <h2 className='text-black text-4xl font-bold mb-10 text-center'>{post.title}</h2>
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
        <p className='text-gray-700 mb-10 font-normal text-lg'>{post.content}</p>
      </div>
      <div className='flex items-center justify-center mb-6'>
        <TheButton className='btn text-xl py-4' onClick={navigateHandler}>
          Продолжить чтение
        </TheButton>
      </div>
    </div>
  )
}
