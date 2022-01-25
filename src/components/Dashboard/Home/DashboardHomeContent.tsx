import { FC } from 'react'
import { User } from '../../../types/user'
import { MyButton } from '../../UI/MyButton/MyButton'
import { ReactComponent as Writer } from '../../../images/writer.svg'
import { useNavigate } from 'react-router-dom'
import { Spin } from '../../UI/Spin/Spin'
import { BellIcon } from '@heroicons/react/outline'

interface DashboardHomeContentProps {
  user: User
  isLoading: boolean
}

export const DashboardHomeContent: FC<DashboardHomeContentProps> = ({ user, isLoading }) => {
  const navigate = useNavigate()

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
        <div className='flex justify-center text-gray-700'>
          {isLoading && <Spin displayText='...загружается' />}

          {!user.notification.length && (
            <div className='flex flex-col items-center'>
              <BellIcon width={40} />
              <p className='font-bold text-2xl mt-10'>Список уведомлений пуст</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
