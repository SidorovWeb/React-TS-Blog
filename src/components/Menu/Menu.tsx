import { BellIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActions } from '../../hooks/useActions'
import { useModal } from '../../hooks/useModal'
import { User } from '../../types/userTypes'
import { statusColor } from '../../utils'
import { Profile } from '../Profile/Profile'

interface MenuProps {
  user: User
}

export const Menu: FC<MenuProps> = ({ user }) => {
  const { usersUpdate, userUpdate } = useActions()
  const { show, Modal } = useModal()

  const onClickReadMessage = (notification: any) => {
    const notificationFilter = user.notification.filter((n) => n.id !== notification.id)

    const newUser: User = {
      ...user,
      notification: notificationFilter,
    }

    userUpdate(newUser)
    usersUpdate(newUser)
    toast.success('Сообщение прочитано')
  }

  return (
    <div className='flex items-center relative'>
      <Link className='flex items-center mr-2' to={`/my-account/home`}>
        <Profile user={user} />
      </Link>
      <div
        className='flex items-center p-1 relative'
        onClick={() => {
          show()
        }}
      >
        <BellIcon width={24} className='hover cursor-pointer' />
        {!!user.notification.length && (
          <div className='absolute bottom-1 right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse'></div>
        )}
      </div>
      <Modal>
        <div className='flex flex-col'>
          <div className='font-bold mb-2 text-xl'>Сообщения</div>
          <div className='text-black/50 mb-4 text-sm'>
            Новых сообщений {user.notification.length > 0 ? `${user.notification.length}` : 'нет'}
          </div>
          <div className='mb-6'>
            {user.notification.length > 0 && (
              <div className='border-t border-gray-100 text-md pt-2'>
                {user.notification.map((n) => (
                  <div
                    className='cursor-pointer hover:bg-slate-100 transition-all py-2 rounded-lg'
                    key={n.id}
                    onClick={() => onClickReadMessage(n)}
                  >
                    <div className='text-xs' style={{ color: statusColor(n.postStatus) }}>
                      {n.postStatus === 'published' && 'Опубликована'}
                      {n.postStatus === 'rejected' && 'Отклонена'}
                    </div>
                    <div className='text-black font-bold'>{n.postName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
