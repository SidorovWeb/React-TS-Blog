import { FC, useState } from 'react'
import { DashboardContent } from '../components/Dashboard/DashboardContent'
import { DashboardSidebar } from '../components/Dashboard/DashboardSidebar'
import { Drawer } from '../components/Dashboard/Drawer'
import { Modal } from '../components/UI/Modal/Modal'
import { MyButton } from '../components/UI/MyButton/MyButton'
import { useAuth } from '../hooks/useAuth'
import { myPostList } from '../utils'

export const MyAccount: FC = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className='flex flex-1 accountSidebarHeight px-6 pb-6  overflow-hidden'>
      <MyButton className='btn' onClick={() => setOpen(true)}>
        modal
      </MyButton>
      <Drawer />
      <div className='flex gap-5 flex-1 rounded-lg p-6 bg-white'>
        <DashboardContent user={user} postList={myPostList} />
        <DashboardSidebar />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div>Modal</div>
      </Modal>
    </div>
  )
}
