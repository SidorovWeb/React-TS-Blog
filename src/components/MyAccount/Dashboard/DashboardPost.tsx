import { PencilAltIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { postListProps } from '../../../types/postsTypes'
import { formatTimestamp, statusColor } from '../../../utils'
import { MyButton } from '../../UI/MyButton/MyButton'

interface DashboardPostProps {
  post: postListProps
  uid?: string
  myPosts?: boolean
  deleteOnClick?: any
}

export const DashboardPost: FC<DashboardPostProps> = ({ post, uid, myPosts, deleteOnClick }) => {
  const navigate = useNavigate()

  const status = {
    color: `${statusColor(post.status.type)}`,
    border: `4px solid ${statusColor(post.status.type)}`,
  }

  const onClickNavigation = () => {
    if (uid === post.uid) {
      navigate(`/my-account/editor/${post.id}`)
    } else {
      navigate(`/my-account/editor/${post.id}?moderation`)
    }
  }

  return (
    <div className='flex justify-between flex-col md:flex-row mb-4 px-4 py-6 rounded-lg bg-blue-100 shadow-lg'>
      {post.previewImage.url && (
        <div
          className='w-full md:w-32 mb-4 md:mb-0 md:h-20 rounded-lg shadow-lg overflow-hidden shrink-0 self-center inline-block hover'
          onClick={onClickNavigation}
        >
          <img className='img' src={post.previewImage.url} alt={post.title} loading='lazy' />
        </div>
      )}

      <div className={`${post.previewImage.url && 'md:px-4 md:ml-4'}  flex-grow font-bold`}>
        <div className='text-lg text-black mb-4 cursor-pointer hover block' onClick={onClickNavigation}>
          {post.title}
        </div>
        <div className='flex'>
          <div className='mr-4 flex flex-col'>
            {!myPosts && <div className='text-gray-700 mb-4 md:mb-0'>Автор: {post.author}</div>}

            <div className='mb-4 md:mb-0 text-gray-700'>Пост создан: {formatTimestamp(post.timestamp)}</div>
          </div>
        </div>
      </div>
      <div className='shrink-0'>
        <div className='mb-2'>
          <span className='text-gray-700'>Статус:</span>{' '}
          <span className='font-bold' style={{ color: status.color }}>
            {post.status.type}
          </span>
        </div>
        {uid === post.uid ? (
          <div className='flex items-center justify-center'>
            <MyButton className='btn py-2 block w-16' onClick={onClickNavigation}>
              <PencilAltIcon width={20} />
            </MyButton>
            <MyButton
              className='btn py-2 ml-4 w-16 !bg-red-600'
              onClick={() => {
                deleteOnClick(post)
              }}
            >
              <TrashIcon width={20} />
            </MyButton>
          </div>
        ) : (
          <div className='flex items-center justify-end'>
            <MyButton className='btn py-2 block w-16' onClick={onClickNavigation}>
              <EyeIcon width={20} />
            </MyButton>
          </div>
        )}
      </div>
    </div>
  )
}
