import { PlusSmIcon } from '@heroicons/react/solid'
import { getAuth, signOut } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { defaultUser } from '../../constants'
import { postStatus } from '../../store/action-creators/postAction'
import { IPostListProps } from '../../types/posts'
import { userType } from '../../types/user'
import { statusColor } from '../../utils'
import { MyButton } from '../UI/MyButton/MyButton'

interface DashboardSidebarProps {
  post?: IPostListProps
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser')
        dispatch({
          type: userType.SET_USER,
          payload: defaultUser,
        })
        navigate('/')

        toast.success('Вы успешно вышли')
      })
      .catch((error) => toast.error(error.message))
  }

  return (
    <div className='xl:w-60 shrink-0'>
      <div className='bg-gray-100 p-6 rounded-lg text-center font-bold'>
        {post ? (
          <>
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
                {/* {console.log(post.status)} */}
                {post.status !== '' ? post.status : 'черновик'}
              </span>
            </p>
            <p>
              Не забудьте сохранить пост. Все сохранённые черновики вы найдёте на вкладке «Мои посты» в личном кабинете.
            </p>
          </>
        ) : (
          <MyButton
            className='font-bold text-red-600 py-2 px-4 w-full hover:bg-red-600 hover:text-white rounded-lg transition-all'
            onClick={onLogout}
          >
            Выйти
          </MyButton>
        )}
      </div>
    </div>
  )
}
