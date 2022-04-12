import { BellIcon, HomeIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useModal } from '../../hooks/useModal'
import { menu } from '../../store/action-creators/menuAction'
import { usersUpdate, userUpdate } from '../../store/action-creators/userAction'
import { User } from '../../types/userTypes'
import { isMyAccount, statusColor } from '../../utils'
import { Profile } from '../Profile/Profile'

interface MenuProps {
  user: User
}

export const Menu: FC<MenuProps> = ({ user }) => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const { hide, show, Modal } = useModal()

  const onClickReadMessage = async (notification: any) => {
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

      {isMyAccount(pathname) && (
        <Link className='flex items-center p-2 font-bold hover' to={`/`} onClick={() => dispatch(menu(false))}>
          <HomeIcon width={24} />
        </Link>
      )}

      <Modal>
        <div className='flex flex-col'>
          <div className='font-bold mb-2 text-xl'>Сообщения</div>
          <div className='text-black/50 mb-4 text-sm'>
            Новых сообщений {user.notification.length > 0 ? `${user.notification.length}` : 'нет'}
          </div>
          <div className='mb-6'>
            {user.notification.length > 0 && (
              <div className='border-t border-gray-100 text-sm pt-2'>
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
