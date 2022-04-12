import { FC, useState } from 'react'
import { User } from '../../../types/userTypes'
import { MyButton } from '../../UI/MyButton/MyButton'
import { ReactComponent as Writer } from '../../../icons/writer.svg'
import { useNavigate } from 'react-router-dom'
import { BellIcon, CheckIcon, EyeIcon } from '@heroicons/react/outline'
import { statusColor } from '../../../utils'
import { useDispatch } from 'react-redux'
import { usersUpdate, userUpdate } from '../../../store/action-creators/userAction'
import { toast } from 'react-toastify'
import { useModal } from '../../../hooks/useModal'

interface DashboardHomeContentProps {
  user: User
  isLoading: boolean
}

export const DashboardHomeContent: FC<DashboardHomeContentProps> = ({ user, isLoading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notification, setNotification] = useState<any>([])
  const { hide, show, Modal } = useModal()

  const onClickReadMessage = async (notification: any) => {
    hide()
    const notificationFilter = user.notification.filter((n) => n.id !== notification.id)

    const newUser: User = {
      ...user,
      notification: notificationFilter,
    }

    await new Promise((resolve) => resolve(dispatch(userUpdate(newUser))))
    dispatch(usersUpdate(newUser))
    toast.success('Сообщение прочитано')
  }

  return (
    <div className='flex-grow'>
      <div className='flex justify-between gap-5 flex-wrap bg-amber-400 rounded-lg overflow-hidden mb-10 shadow-lg'>
        <div className='flex flex-col items-start p-4 max-w-xl text-black'>
          <div className='text-base lg:text-3xl font-bold mb-4 flex flex-wrap'>
            Привет
            <span className='ml-2'>{!isLoading && user.userName}!</span>
          </div>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloribus magnam earum labore iste omnis id
            soluta ullam! Expedita.
          </p>
          <MyButton
            className='btn !bg-pink-500 hover:!bg-pink-700 !p-4 mt-auto mx-auto md:mx-0'
            onClick={() => navigate('/my-account/editor')}
          >
            Написать новый пост
          </MyButton>
        </div>
        <Writer className='2xl:block hidden' fill='#FBBF24' width={400} />
      </div>
      <div className='rounded-lg'>
        <div className={`${!user.notification.length ? 'justify-center text-gray-700' : 'justify-start'} flex`}>
          {!user.notification.length ? (
            <div className='flex flex-col items-center'>
              <BellIcon width={40} />
              <p className='font-bold text-xl xl:text-2xl mt-10'>Список уведомлений пуст</p>
            </div>
          ) : (
            <div className='w-full flex flex-col'>
              {user.notification.map((n) => (
                <div
                  className='flex flex-col md:flex-row items-center justify-between font-bold text-xl p-4 rounded-lg bg-blue-100 mb-4'
                  key={n.id}
                >
                  <div className='text-black text-base mb-4 md:mb-0'>
                    <span>Статья:</span> {n.postName}
                  </div>
                  <div className='text-right flex flex-col items-center md:block'>
                    <div className='md:ml-2 mb-2 text-xs' style={{ color: statusColor(n.postStatus) }}>
                      {n.postStatus === 'published' && 'Опубликована'}
                      {n.postStatus === 'rejected' && 'Отклонена'}
                    </div>
                    <div className='flex items-center'>
                      <MyButton
                        className='btn py-2 block w-16 ml-4'
                        onClick={() => {
                          setNotification(n)
                          show()
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

      <Modal>
        <div className='text-center'>
          <div className='text-center mb-6 font-bold text-xl'>{notification?.message}</div>
          <MyButton className='btn py-2 text-sm lg:text-base' onClick={() => onClickReadMessage(notification)}>
            Прочитано
          </MyButton>
          <MyButton className='btn py-2 ml-4 text-sm lg:text-base' onClick={hide}>
            Отмена
          </MyButton>
        </div>
      </Modal>
    </div>
  )
}
