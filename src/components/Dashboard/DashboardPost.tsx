import { PencilAltIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from '../../hooks/useTypedSelector'
import { modal } from '../../store/action-creators/modalAction'
import { postDelete } from '../../store/action-creators/postAction'
import { storageDelete } from '../../store/action-creators/storageAction'
import { IPostListProps } from '../../types/postsTypes'
import { formatTimestamp, statusColor } from '../../utils'
import { Modal } from '../UI/Modal/Modal'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardPostProps {
  post: IPostListProps
  uid?: string
  myPosts?: boolean
}

export const DashboardPost: FC<DashboardPostProps> = ({ post, uid, myPosts }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPost, setCurrentPost] = useState<any>()
  const { open } = useSelector((state) => state.modal)

  const status = {
    color: `${statusColor(post.status.type)}`,
    border: `4px solid ${statusColor(post.status.type)}`,
  }

  const deleteOnClick = async () => {
    if (currentPost.previewImage.url) {
      await new Promise((resolve) => resolve(dispatch(storageDelete(currentPost.previewImage.fileLocated))))
    }

    dispatch(postDelete(currentPost))
    dispatch(modal(false))
    toast.success('Пост удален!')
  }

  const onClickNavigation = () => {
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
        <div
          className='w-32 h-20 rounded-lg overflow-hidden shrink-0 self-center inline-block hover'
          onClick={onClickNavigation}
        >
          <img className='img' src={post.previewImage.url} alt={post.title} loading='lazy' />
        </div>
      )}

      <div className={`${post.previewImage.url && 'px-4 ml-4'}  flex-grow font-bold`}>
        <div className='text-lg mb-4 cursor-pointer hover block' onClick={onClickNavigation}>
          {post.title}
        </div>
        <div className='flex'>
          <div className='mr-4 flex flex-col'>
            {!myPosts && <div className='text-gray-700'>Автор: {post.author}</div>}

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
            {post.status.type}
          </span>
        </div>
        {uid === post.uid ? (
          <div className='flex items-center'>
            <MyButton className='btn py-2 block w-16' onClick={onClickNavigation}>
              <PencilAltIcon width={20} />
            </MyButton>
            <MyButton
              className='btn py-2 ml-4 w-16 !bg-red-600'
              onClick={() => {
                setCurrentPost(post)
                dispatch(modal(true))
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

      {currentPost && open && (
        <Modal open={open}>
          <div className='text-center'>
            <div className='font-bold text-xl mb-6'>Удалить пост ?</div>
            <MyButton className='btn py-2  !bg-red-600' onClick={deleteOnClick}>
              Удалить
            </MyButton>
            <MyButton className='btn py-2 ml-4' onClick={() => dispatch(modal(false))}>
              Отменить
            </MyButton>
          </div>
        </Modal>
      )}
    </div>
  )
}
