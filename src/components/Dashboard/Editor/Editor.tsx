import { CheckIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { defaultPost } from '../../../constants'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from '../../../hooks/useTypedSelector'
import { DashboardSidebar } from '../DashboardSidebar'
import { EditorContent } from './EditorContent'

export const Editor: FC = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const { posts } = useSelector((state) => state.post)
  const post = posts.find((post) => post.id === id) ?? defaultPost

  return (
    <>
      <div className='flex-grow pb-14 bg-gray-100 px-6 pt-6 rounded-lg'>
        {post.status === 'pending' ? (
          <div className='bg-green-300 flex items-start p-4 font-bold max-w-lg mx-auto rounded-lg'>
            <CheckIcon width={34} />
            <div className='pl-4'>
              <p>Пост успешно отправлен на модерацию.</p>
              <p>
                <Link className='text-gray-700 underline hover' to={'/my-account/editor'}>
                  Создайте новую запись
                </Link>{' '}
                или посмотрите, что нового на{' '}
                <Link className='text-gray-700 underline hover' to={'/my-account/home'}>
                  главной
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <EditorContent user={user} post={post} />
        )}
      </div>
      <DashboardSidebar post={post} />
    </>
  )
}
