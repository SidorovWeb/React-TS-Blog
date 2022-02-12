import { PlusSmIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { postStatus } from '../../../store/action-creators/postAction'
import { IPostListProps } from '../../../types/postsTypes'
import { statusColor } from '../../../utils'
import { MyButton } from '../../UI/MyButton/MyButton'

interface EditorSidebarUserProps {
  post: IPostListProps
}

export const EditorSidebarUser: FC<EditorSidebarUserProps> = ({ post }) => {
  const dispatch = useDispatch()
  return (
    <>
      <MyButton
        className={`${post.status === 'pending' && `opacity-60 pointer-events-none`} btn p-4 w-full mb-4`}
        onClick={() =>
          dispatch(
            postStatus({
              type: 'pending',
              message: 'Пост успешно отправлен на модерацию',
            })
          )
        }
      >
        На модерацию
      </MyButton>
      <MyButton
        className={`${
          post.status === 'pending' && `opacity-60 pointer-events-none`
        } p-4 w-full flex items-center justify-center hover:bg-gray-300 bg-transparent transition-all rounded-lg mb-4 font-bold`}
        onClick={() => {
          post.id
            ? dispatch(
                postStatus({
                  type: 'draft',
                  message: 'Пост успешно обновлен',
                })
              )
            : dispatch(
                postStatus({
                  type: 'draft',
                  message: 'Пост успешно сохранен в черновик',
                })
              )
        }}
      >
        <PlusSmIcon width={24} /> Сохранить
      </MyButton>
      <p className='mb-10'>
        Статья:{' '}
        <span className='' style={{ color: statusColor(post.status) }}>
          {post.status !== '' ? post.status : 'черновик'}
        </span>
      </p>
      <p>Не забудьте сохранить пост. Все сохранённые черновики вы найдёте на вкладке «Мои посты» в личном кабинете.</p>
    </>
  )
}
