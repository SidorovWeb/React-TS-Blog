import { PencilAltIcon, TrashIcon, EyeIcon, FlagIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from '../../hooks/useTypedSelector'
import { modal } from '../../store/action-creators/modalAction'
import { postDelete } from '../../store/action-creators/postAction'
import { storageDelete } from '../../store/action-creators/storageAction'
import { IPostListProps } from '../../types/postsTypes'
import { formatTimestamp, statusColor } from '../../utils'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardPostProps {
  post: IPostListProps
  uid?: string
}

export const DashboardPost: FC<DashboardPostProps> = ({ post, uid }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = {
    color: `${statusColor(post.status)}`,
    border: `4px solid ${statusColor(post.status)}`,
  }

  const deleteOnClick = async () => {
    // dispatch(modal(true))

    if (post.previewImage.url) {
      await new Promise((resolve) => resolve(dispatch(storageDelete(post.previewImage.fileLocated))))
    }

    dispatch(postDelete(post))
  }

  const navigationOnClick = () => {
    if (uid === post.uid) {
      navigate(`/my-account/editor/${post.id}`)
    } else {
      navigate(`/my-account/editor/${post.id}?moderation`)
    }
  }

  return (
    <div
      className='flex  justify-between mb-4 p-4 rounded-lg bg-blue-100'
      style={{ borderLeft: status.border, borderRight: status.border }}
    >
      {post.previewImage.url && (
        <div className='w-32 h-20 rounded-lg overflow-hidden shrink-0 self-center' onClick={navigationOnClick}>
          <img className='img' src={post.previewImage.url} alt={post.title} loading='lazy' />
        </div>
      )}

      <div className={`${post.previewImage.url && 'px-4 ml-4'}  flex-grow font-bold`}>
        <div className='text-lg mb-4 cursor-pointer hover block' onClick={navigationOnClick}>
          {post.title}
        </div>
        <div className='flex'>
          <div className='mr-4 flex flex-col'>
            <div className='text-gray-700'>Автор: {post.author}</div>
            <div className='text-gray-700'>Пост создан: {formatTimestamp(post.timestamp)}</div>
          </div>
        </div>
        <div className='flex gap-4'>
          {post.categories.map((cat, idx) => (
            <span key={idx}>{cat.name}</span>
          ))}
        </div>
      </div>
      <div className='shrink-0'>
        <div className='mb-2'>
          <span className='text-gray-700'>Статус:</span>{' '}
          <span className='font-bold' style={{ color: status.color }}>
            {post.status}
          </span>
        </div>
        {uid === post.uid ? (
          <div className='flex items-center'>
            <div className='btn py-2 block w-16' onClick={navigationOnClick}>
              <PencilAltIcon width={20} />
            </div>
            <MyButton className='btn py-2 ml-4 w-16' onClick={deleteOnClick}>
              <TrashIcon width={20} />
            </MyButton>
          </div>
        ) : (
          <div className='flex items-center'>
            <div className='btn py-2 block w-16' onClick={navigationOnClick}>
              <EyeIcon width={20} />
            </div>
            <MyButton className='btn py-2 ml-4 w-16'>
              <FlagIcon width={20} />
            </MyButton>
          </div>
        )}
      </div>
    </div>
  )
}
