import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPostListProps } from '../types/postsTypes'
import { CalendarIcon, UserIcon } from '@heroicons/react/solid'
import { myPostList } from '../utils'

export const PostIdPage: FC = () => {
  const { slug } = useParams()

  const [postList] = useState<IPostListProps[]>([...myPostList])

  const post = postList.find((post) => post.slug === slug)

  return (
    <>
      {post && (
        <div className='rounded-lg overflow-hidden bg-white shadow-lg mb-8 p-8'>
          <div className='mb-8 rounded-lg overflow-hidden'>
            <img className='max-h-80 w-full object-cover cursor-pointer' src={post.previewImage} alt='Изображение' />
          </div>
          <h2 className='text-black text-4xl font-bold mb-10 text-center'>{post.title}</h2>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center'>
              {/* <img src={post.authorPhoto} alt={post.author} /> */}
              <UserIcon className='icon text-pink-600' />
              <p className='text-gray-700 font-bold mt-1'>{post.author}</p>
            </div>

            <div className='flex items-center'>
              <CalendarIcon className='icon text-pink-600' />
              <p className='text-gray-700 font-bold mt-1'>{post.timestamp}</p>
            </div>
          </div>

          <div>
            <p className='text-gray-700 mb-10 font-normal text-lg'>{post.content}</p>
          </div>
        </div>
      )}
    </>
  )
}
