import { FC, useState } from 'react'
import { User } from '../../../types/userTypes'
import { MyButton } from '../../UI/MyButton/MyButton'
import { ReactComponent as Writer } from '../../../images/writer.svg'
import { useNavigate } from 'react-router-dom'
import { Spin } from '../../UI/Spin/Spin'
import { BellIcon, CheckIcon, EyeIcon } from '@heroicons/react/outline'
import { statusColor } from '../../../utils'
import { Modal } from '../../UI/Modal/Modal'
import { useSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { modal } from '../../../store/action-creators/modalAction'
import { usersUpdate, userUpdate } from '../../../store/action-creators/userAction'
import { toast } from 'react-toastify'

interface DashboardHomeContentProps {
  user: User
  isLoading: boolean
}

export const DashboardHomeContent: FC<DashboardHomeContentProps> = ({ user, isLoading }) => {
  const navigate = useNavigate()
  const { open } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const [notification, setNotification] = useState<any>()

  const onClickReadMessage = async (notification: any) => {
    const notificationFilter = user.notification.filter((n) => n.id !== notification.id)

    const newUser: User = {
      ...user,
      notification: notificationFilter,
    }

    await new Promise((resolve) => resolve(dispatch(userUpdate(newUser))))
    dispatch(usersUpdate(newUser))
    toast.success('Сообщение прочитано')
    dispatch(modal(false))
  }

  return (
    <div className='flex-grow'>
      <div className='flex justify-between gap-5 flex-wrap bg-amber-400 rounded-lg overflow-hidden mb-10'>
        <div className='flex flex-col items-start p-4 max-w-xl'>
          <div className='text-3xl font-bold mb-4 flex'>
            Привет
            <div className='flex ml-2'>
              {isLoading && <Spin displayText={'...загружается'} />}
              {!isLoading && user.userName}!
            </div>
          </div>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloribus magnam earum labore iste omnis id
            soluta ullam! Expedita.
          </p>
          <MyButton className='btn p-4 mt-auto' onClick={() => navigate('/my-account/editor')}>
            Написать новый пост
          </MyButton>
        </div>
        <Writer className='2xl:block hidden' fill='#FBBF24' width={400} />
      </div>
      <div className='rounded-lg'>
        <div className={`${!user.notification.length ? 'justify-center text-gray-700' : 'justify-start'} flex`}>
          {isLoading && <Spin displayText='...загружается' />}

          {!user.notification.length ? (
            <div className='flex flex-col items-center'>
              <BellIcon width={40} />
              <p className='font-bold text-2xl mt-10'>Список уведомлений пуст</p>
            </div>
          ) : (
            <div className='w-full flex flex-col'>
              {user.notification.map((n) => (
                <div
                  className='flex items-center justify-between font-bold text-xl p-4 rounded-lg bg-blue-100 mb-4'
                  key={n.id}
                >
                  <div>
                    <span className='text-gray-700'>Статья:</span> {n.postName}
                  </div>
                  <div className='text-right'>
                    <div className='ml-2 mb-2' style={{ color: statusColor(n.postStatus) }}>
                      {n.postStatus === 'published' && 'Опубликована'}
                      {n.postStatus === 'rejected' && 'Отклонена'}
                    </div>
                    <div className='flex items-center'>
                      <MyButton
                        className='btn py-2 block w-16 ml-4'
                        onClick={() => {
                          setNotification(n)
                          dispatch(modal(true))
                        }}
                      >
                        <EyeIcon width={20} />
                      </MyButton>
                      <MyButton
                        className='btn py-2 block w-16 ml-4 !bg-green-600'
                        onClick={() => onClickReadMessage(n)}
                      >
                        <CheckIcon width={20} />
                      </MyButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {notification && open && (
        <Modal open={open}>
          <div className='text-center'>
            <div className='text-center mb-6 font-bold text-xl'>{notification?.message}</div>
            <MyButton className='btn py-2' onClick={() => onClickReadMessage(notification)}>
              Прочитано
            </MyButton>
            <MyButton className='btn py-2 ml-4' onClick={() => dispatch(modal(false))}>
              Отмена
            </MyButton>
          </div>
        </Modal>
      )}
    </div>
  )
}
