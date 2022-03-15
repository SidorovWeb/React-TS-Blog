import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardDrawer } from '../components/Dashboard/DashboardDrawer'
import { useSelector } from '../hooks/useTypedSelector'

export const MyAccount: FC = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <div className='flex flex-1 accountSidebarHeight px-6 pb-6  overflow-hidden'>
      <DashboardDrawer user={user} />
      <div className='flex gap-5 flex-1 rounded-lg p-6 bg-white'>
        <Outlet />
      </div>
    </div>
  )
}
