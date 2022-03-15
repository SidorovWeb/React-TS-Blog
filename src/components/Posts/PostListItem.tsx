import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../hooks/useTypedSelector'
import { IPostListProps } from '../../types/postsTypes'
import { User } from '../../types/userTypes'

interface PostItemPost {
  post: IPostListProps
}

export const PostItem: FC<PostItemPost> = ({ post }) => {
  const users = useSelector((state) => state.user.users)
  const [postUser, setPostUser] = useState<User>()

  useEffect(() => {
    const user = users.filter((u: User) => u.id === post.uid)
    setPostUser(user[0])
  }, [users.length])

  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-white shadow-lg mb-4 px-8 py-4 text-left border border-gray-400'>
      <div className='flex mt-auto items-center justify-between'>
        <div className='flex items-center mb-4'>
          <div className='w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden mr-4'>
            {postUser && postUser.userPhoto.url && (
              <img src={postUser.userPhoto.url} alt={post.author} className='img !cursor-auto' loading='lazy' />
            )}
          </div>
          <div className='text-gray-700 font-bold mt-1'>{post.author}</div>
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
          className='mb-8 rounded-lg overflow-hidden block relative thumbnail-gradient-before aspect-video w-32 h-32 md:max-h-80 shrink-0'
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
