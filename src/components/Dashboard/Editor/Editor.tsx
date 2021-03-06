import { CheckIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector } from '../../../hooks/useTypedSelector'
import { EditorMain } from './EditorMain'
import { EditorSidebarAdmin } from './EditorSidebarAdmin'
import { EditorSidebarUser } from './EditorSidebarUser'

export const Editor: FC = () => {
  const user = useSelector((state) => state.user.user)
  const { id } = useParams()
  const posts = useSelector((state) => state.post.posts)
  const post = posts.find((post) => post.id === id) ?? {
    author: '',
    authorPhoto: {
      fileLocated: '',
      url: '',
    },
    title: '',
    slug: '',
    categories: [],
    previewImage: {
      url: '',
      fileLocated: '',
    },
    timestamp: '',
    excerpt: '',
    content: '',
    id: '',
    uid: '',
    status: {
      type: 'draft',
      message: '',
    },
  }
  const location = useLocation()
  const isModeration = location.search.includes('moderation')

  return (
    <>
      <div className='flex-grow pb-14 bg-gray-100 p-3 md:px-6 md:pt-6 rounded-lg shadow-lg'>
        {post.status.type === 'pending' && !isModeration ? (
          <div className='bg-green-300 flex items-start p-4 font-bold max-w-lg mx-auto rounded-lg'>
            <CheckIcon width={34} color='black' />
            <div className='pl-4  text-gray-900'>
              <p>Пост успешно отправлен на модерацию.</p>
              <p>
                <Link
                  className='text-gray-700 underline hover:opacity-60 transition-opacity '
                  to={'/my-account/editor'}
                >
                  Создайте новую запись
                </Link>{' '}
                или посмотрите, что нового на{' '}
                <Link className='text-gray-700 underline hover:opacity-60 transition-opacity ' to={'/my-account/home'}>
                  главной
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <EditorMain user={user} post={post} />
        )}
      </div>
      <div className='xl:w-60 -order-1 xl:order-none'>
        <div className='bg-gray-100 p-3 md:p-6 rounded-lg text-center font-bold shadow-lg'>
          {!isModeration ? <EditorSidebarUser post={post} /> : <EditorSidebarAdmin currentUser={user} post={post} />}
        </div>
      </div>
    </>
  )
}
