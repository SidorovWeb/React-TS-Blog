import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Drawer } from '../components/Dashboard/Drawer'
import { Modal } from '../components/UI/Modal/Modal'
import { useSelector } from '../hooks/useTypedSelector'

export const MyAccount: FC = () => {
  const { open } = useSelector((state) => state.modal)

  return (
    <div className='flex flex-1 accountSidebarHeight px-6 pb-6  overflow-hidden'>
      <Drawer />
      <div className='flex gap-5 flex-1 rounded-lg p-6 bg-white'>
        <Outlet />
      </div>

      <Modal open={open}>
        <div>Modal</div>
      </Modal>
    </div>
  )
}
