import { FC, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { formatTimestamp } from '../utils'
import { useSelector } from '../hooks/useTypedSelector'
import { User } from '../types/userTypes'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
import { Profile } from '../components/Profile/Profile'

export const PostPage: FC = () => {
  const { slug } = useParams()
  const location = useLocation()

  const posts = useSelector((state) => state.post.posts)
  const post = posts.find((post) => post.slug === slug)
  const users = useSelector((state) => state.user.users)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const user = users.filter((u: User) => u.id === post?.uid)
    setUser(user[0])
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className='lg:container mx-auto pt-7'>
      {post ? (
        <div className='rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 shadow-lg dark:shadow-gray-50/10'>
          <div className='mb-8 shadow-lg dark:shadow-gray-50/10'>
            <img
              className='max-h-80 lg:max-h-[422px] w-full object-cover'
              src={post.previewImage.url}
              alt='Изображение'
            />
          </div>
          <div className='p-3 md:p-8'>
            <h2 className='text-gray-700 dark:text-white text-xl lg:text-2xl font-bold mb-10 text-center'>
              {post.title}
            </h2>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center '>
                <div className='flex-shrink-0 mr-2'>
                  <Profile user={user} />
                </div>

                <div className='text-gray-700/80 dark:text-white/80 dark:text-white font-bold mt-1'>{post.author}</div>
              </div>

              <div className='flex items-center'>
                <div className='text-gray-700/80 dark:text-white/80 font-bold mt-1'>
                  {formatTimestamp(post.timestamp)}
                </div>
              </div>
            </div>

            <div>
              <div className='text-gray-700 dark:text-white mb-10 font-normal text-base md:text-lg'>{post.content}</div>
            </div>

            <div className='flex flex-wrap'>
              {post.categories.map((tag, idx) => (
                <div
                  className={`mr-2 mb-2 text-sm py-2 px-4 bg-slate-600 text-white font-bold rounded-lg shadow-lg`}
                  key={idx}
                >
                  {tag.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <SkeletonCard cl='h-[735px]' />
      )}
    </div>
  )
}
