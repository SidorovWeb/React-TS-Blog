import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/types'

interface ArticleCardLargeProps {
  post: IPostListProps
}

export const ArticleCardLarge: FC<ArticleCardLargeProps> = ({ post }) => {
  return (
    <div className='rounded-lg overflow-hidden flex justify-end bg-white shadow-lg relative text-left'>
      <Link
        className='overflow-hidden h-full  absolute t-0 left-0 thumbnail-gradient'
        style={{ background: `url(${post.previewImage}) no-repeat center/cover`, width: '55%' }}
        to={`post/${post.id}`}
      ></Link>
      <div className='flex flex-col justify-between w-1/2 p-8 py-16 z-10 relative'>
        <Link className='text-black text-4xl font-bold mb-10 hover:opacity-60 transition-all' to={`post/${post.id}`}>
          {post.title}
        </Link>
        <div>
          <p className='text-gray-700 mb-10 font-normal text-lg'>{post.excerpt}</p>
        </div>
        <div className='flex items-center'>
          <Link
            className='w-11 h-11 rounded-full overflow-hidden mr-4 hover:opacity-60 transition-all'
            to={`post/${post.id}`}
          >
            <img src={post.authorPhoto} alt={post.author} className='img' />
          </Link>
          <Link className='text-gray-700 font-bold hover:opacity-60 transition-all' to={`post/${post.id}`}>
            {post.author}
          </Link>
          <p className='px-2'>на</p>
          <p className='text-gray-700'>{post.dateOfCreation}</p>
        </div>
      </div>
    </div>
  )
}
