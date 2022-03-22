import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../hooks/useTypedSelector'
import { IPostListProps } from '../../types/postsTypes'
import { User } from '../../types/userTypes'
import { formatTimestamp } from '../../utils'

interface ArticleCardLargeProps {
  post: IPostListProps
}

export const ArticleCardLarge: FC<ArticleCardLargeProps> = ({ post }) => {
  const users = useSelector((state) => state.user.users)
  const [postUser, setPostUser] = useState<User>()

  useEffect(() => {
    const user = users.filter((u: User) => u.id === post.uid)
    setPostUser(user[0])
  }, [users.length])

  return (
    <div className='rounded-lg overflow-hidden flex justify-end bg-white shadow-lg relative text-left border border-gray-400'>
      <Link
        className='overflow-hidden h-full  absolute t-0 left-0 thumbnail-gradient'
        style={{ background: `url(${post.previewImage.url}) no-repeat center/cover`, width: '55%' }}
        to={`/post/${post.slug}`}
      ></Link>
      <div className='flex flex-col justify-between w-1/2 p-8 py-16 z-10 relative'>
        <Link className='text-black text-4xl font-bold mb-10 hover:opacity-60 transition-all' to={`/post/${post.slug}`}>
          {post.title}
        </Link>
        <div>
          <p className='text-gray-700 mb-10 font-bold text-lg'>{post.excerpt}</p>
        </div>
        <div className='flex items-center font-bold text-gray-700'>
          <div className='w-11 h-11 rounded-lg overflow-hidden mr-4'>
            {postUser && postUser.userPhoto.url && (
              <img src={postUser.userPhoto.url} alt={post.author} className='img !cursor-auto' loading='lazy' />
            )}
          </div>
          <div className=' font-bold'>{post.author}</div>
        </div>
      </div>
    </div>
  )
}
