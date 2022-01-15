import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { IPostListProps } from '../../types/posts'
import { statusColor } from '../../utils'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardPostProps {
  post: IPostListProps
}

export const DashboardPost: FC<DashboardPostProps> = ({ post }) => {
  const status = {
    color: `${statusColor(post.status)}`,
    border: `4px solid ${statusColor(post.status)}`,
  }

  return (
    <div
      className='flex items-center justify-between mb-4 p-4 rounded-lg bg-blue-100 '
      style={{ borderLeft: status.border, borderRight: status.border }}
    >
      {/* TODO: Цвет статуса поста распространяется на ? */}
      <div className='w-20 h-16 rounded-lg overflow-hidden shrink-0'>
        <img className='img' src={post.previewImage} alt={post.title} />
      </div>
      <div className='px-4 flex-grow'>
        <p className='font-bold text-lg'>{post.title}</p>
        {/* <p className='text-sm'>{post.author}</p> */}
        <div className='flex'>
          <p className='mr-4'>
            <span className='text-gray-500'>Слов:</span> 1200
          </p>
          <p>
            <span className='text-gray-500'>Создан:</span> {post.dateOfCreation}
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
          <span className='text-gray-500'>Статус:</span>{' '}
          <span className='font-bold' style={{ color: status.color }}>
            {post.status}
          </span>
        </div>
        <MyButton className='btn py-2'>
          <PencilAltIcon width={20} />
        </MyButton>
        <MyButton className='btn py-2 ml-4'>
          <TrashIcon width={20} />
        </MyButton>
      </div>
    </div>
  )
}
