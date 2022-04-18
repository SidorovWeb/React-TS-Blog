import { PlusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { postListProps } from '../../../../types/postsTypes'
import { statusColor } from '../../../../utils'
import { MyButton } from '../../../UI/MyButton/MyButton'

interface EditorSidebarUserProps {
  post: postListProps
}

export const EditorSidebarUser: FC<EditorSidebarUserProps> = ({ post }) => {
  const { postStatus } = useActions()
  return (
    <>
      <div className='mb-4 text-black'>
        <div className='flex flex-col md:flex-row xl:flex-col items-center justify-center'>
          <MyButton
            className={`${
              post.status.type === 'pending' && `opacity-60 pointer-events-none`
            } btn p-4 w-full mb-4 mr-0 md:mr-4 xl:mr-0`}
            onClick={() =>
              postStatus({
                type: 'pending',
                message: 'Статья успешно отправлена на модерацию',
              })
            }
          >
            На модерацию
          </MyButton>
          {post.status.type === 'draft' && (
            <>
              <MyButton
                className='p-4 w-full flex items-center justify-center  transition-all bg-gray-300 hover:bg-gray-600 hover:text-white rounded-lg mb-4 font-bold'
                onClick={() => {
                  post.id
                    ? postStatus({
                        type: 'draft',
                        message: 'Статья успешно обновлена',
                      })
                    : postStatus({
                        type: 'draft',
                        message: 'Статья успешно сохранена в черновик',
                      })
                }}
              >
                <PlusSmIcon width={24} /> Сохранить
              </MyButton>
            </>
          )}
        </div>

        {post.status.type === 'draft' && (
          <p>
            Не забудьте сохранить пост. Все сохранённые черновики вы найдёте на вкладке «Мои посты» в личном кабинете.
          </p>
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
