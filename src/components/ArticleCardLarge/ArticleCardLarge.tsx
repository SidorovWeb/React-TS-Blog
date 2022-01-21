import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/posts'

interface ArticleCardLargeProps {
  post: IPostListProps
}

export const ArticleCardLarge: FC<ArticleCardLargeProps> = ({ post }) => {
  return (
    <div className='rounded-lg overflow-hidden flex justify-end bg-white shadow-lg relative text-left border border-gray-400'>
      <Link
        className='overflow-hidden h-full  absolute t-0 left-0 thumbnail-gradient'
        style={{ background: `url(${post.previewImage}) no-repeat center/cover`, width: '55%' }}
        to={`post/${post.slug}`}
      ></Link>
      <div className='flex flex-col justify-between w-1/2 p-8 py-16 z-10 relative'>
        <Link className='text-black text-4xl font-bold mb-10 hover:opacity-60 transition-all' to={`post/${post.slug}`}>
          {post.title}
        </Link>
        <div>
          <p className='text-gray-700 mb-10 font-bold text-lg'>{post.excerpt}</p>
        </div>
        <div className='flex items-center font-bold text-gray-700'>
          <Link
            className='w-11 h-11 rounded-lg overflow-hidden mr-4 hover:opacity-60 transition-all'
            to={`post/${post.slug}`}
          >
            <img src={post.authorPhoto} alt={post.author} className='img' />
          </Link>
          <Link className=' font-bold hover:opacity-60 transition-all' to={`post/${post.slug}`}>
            {post.author}
          </Link>
          <p className='px-2'>на</p>
          <p className=''>{post.timestamp}</p>
        </div>
      </div>
    </div>
  )
}
