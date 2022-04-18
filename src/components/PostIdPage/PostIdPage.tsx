import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatTimestamp } from '../../utils'
import { useSelector } from '../../hooks/useTypedSelector'
import { User } from '../../types/userTypes'

export const PostIdPage: FC = () => {
  const { slug } = useParams()

  const posts = useSelector((state) => state.post.posts)
  const post = posts.find((post) => post.slug === slug)
  const users = useSelector((state) => state.user.users)
  const [postUser, setPostUser] = useState<User>()

  useEffect(() => {
    const user = users.filter((u: User) => u.id === post?.uid)
    setPostUser(user[0])
  }, [post])

  return (
    <div className='container mx-auto pt-7'>
      {post && (
        <div className='rounded-lg overflow-hidden bg-white shadow-lg p-3 md:p-8'>
          <div className='mb-8 rounded-lg overflow-hidden'>
            <img className='max-h-80 w-full object-cover' src={post.previewImage.url} alt='Изображение' />
          </div>
          <h2 className='text-black text-xl lg:text-2xl font-bold mb-10 text-center'>{post.title}</h2>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center '>
              <div className='w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden mr-4'>
                {postUser && postUser.userPhoto.url && (
                  <img src={postUser.userPhoto.url} alt={post.author} className='img' />
                )}
              </div>

              <div className='text-gray-700 font-bold mt-1'>{post.author}</div>
            </div>

            <div className='flex items-center'>
              <div className='text-gray-700 font-bold mt-1'>{formatTimestamp(post.timestamp)}</div>
            </div>
          </div>

          <div>
            <div className='text-gray-700 mb-10 font-normal text-base md:text-lg'>{post.content}</div>
          </div>

          <div className='flex flex-wrap'>
            {post.categories.map((tag, idx) => (
              <div
                className={`mr-2 mb-2 text-sm py-2 px-4 bg-pink-500 text-white font-bold rounded-lg  hover shadow-lg`}
                key={idx}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
