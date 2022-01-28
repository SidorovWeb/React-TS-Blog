import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { modal } from '../../store/action-creators/modalAction'
import { postDelete } from '../../store/action-creators/postAction'
import { IPostListProps } from '../../types/postsTypes'
import { statusColor } from '../../utils'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardPostProps {
  post: IPostListProps
  uid?: string
}

export const DashboardPost: FC<DashboardPostProps> = ({ post, uid }) => {
  const dispatch = useDispatch()
  const status = {
    color: `${statusColor(post.status)}`,
    border: `4px solid ${statusColor(post.status)}`,
  }

  const onClick = () => {
    // dispatch(modal(true))
    dispatch(postDelete(post))
  }
  // console.log(new Date(post.timestamp.seconds * 1000))

  return (
    <div
      className='flex items-center justify-between mb-4 p-4 rounded-lg bg-blue-100 '
      style={{ borderLeft: status.border, borderRight: status.border }}
    >
      {post.previewImage && (
        <div className='w-20 h-16 rounded-lg overflow-hidden shrink-0'>
          <img className='img' src={post.previewImage} alt={post.title} />
        </div>
      )}

      <div className='px-4 flex-grow'>
        <p className='font-bold text-lg'>{post.title}</p>
        <div className='flex'>
          <p className='mr-4'>
            <span className='text-gray-700'>Слов:</span> 1200
          </p>
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
        {uid === post.uid && (
          <div className='flex items-center'>
            <Link className='btn py-2 block' to={`/my-account/editor/${post.id}`}>
              <PencilAltIcon width={20} />
            </Link>
            <MyButton className='btn py-2 ml-4' onClick={onClick}>
              <TrashIcon width={20} />
            </MyButton>
          </div>
        )}
      </div>
    </div>
  )
}
