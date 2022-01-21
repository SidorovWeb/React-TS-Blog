import { PlusSmIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { postStatus } from '../../store/action-creators/postAction'
import { IPostListProps } from '../../types/posts'
import { statusColor } from '../../utils'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardSidebarProps {
  post?: IPostListProps
  // onSavePost?: () => void
  // onPublishPost?: () => void
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <div className='xl:w-60 shrink-0'>
      {post && (
        <div className='bg-gray-100 p-6 rounded-lg text-center font-bold'>
          <MyButton
            className='btn p-4 w-full mb-4'
            onClick={() =>
              dispatch(
                postStatus({
                  type: 'pending',
                  message: 'Пост успешно отправлен на модерацию',
                })
              )
            }
          >
            Опубликовать
          </MyButton>
          <MyButton
            className='p-4 w-full flex items-center justify-center hover:bg-gray-300 bg-transparent transition-all rounded-lg mb-4 font-bold'
            onClick={() =>
              dispatch(
                postStatus({
                  type: 'draft',
                  message: 'Пост успешно сохранен в черновик',
                })
              )
            }
          >
            <PlusSmIcon width={24} /> Сохранить
          </MyButton>
          <p className='mb-10'>
            Статья:{' '}
            <span className='' style={{ color: statusColor(post.status) }}>
              {/* {console.log(post.status)} */}
              {post.status !== '' ? post.status : 'черновик'}
            </span>
          </p>
          <p>
            Не забудьте сохранить пост. Все сохранённые черновики вы найдёте на вкладке «Мои посты» в личном кабинете.
          </p>
        </div>
      )}
    </div>
  )
}
