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
      <div className='mb-4 text-black'>
        <MyButton
          className={`${post.status.type === 'pending' && `opacity-60 pointer-events-none`} btn p-4 w-full mb-4`}
          onClick={() =>
            dispatch(
              postStatus({
                type: 'pending',
                message: 'Статья успешно отправлена на модерацию',
              })
            )
          }
        >
          На модерацию
        </MyButton>
        {post.status.type === 'draft' && (
          <>
            <MyButton
              className='p-4 w-full flex items-center justify-center hover:bg-gray-300 bg-transparent transition-all rounded-lg mb-4 font-bold'
              onClick={() => {
                post.id
                  ? dispatch(
                      postStatus({
                        type: 'draft',
                        message: 'Статья успешно обновлена',
                      })
                    )
                  : dispatch(
                      postStatus({
                        type: 'draft',
                        message: 'Статья успешно сохранена в черновик',
                      })
                    )
              }}
            >
              <PlusSmIcon width={24} /> Сохранить
            </MyButton>
            <p>
              Не забудьте сохранить пост. Все сохранённые черновики вы найдёте на вкладке «Мои посты» в личном кабинете.
            </p>
          </>
        )}
      </div>
      <div className='text-black'>
        Статья:{' '}
        <span className='' style={{ color: statusColor(post.status.type) }}>
          {post.status.type !== '' ? post.status.type : 'draft'}
        </span>
      </div>
    </>
  )
}
