import React, { FC } from 'react'

interface DrawerItemProps {
  children: React.ReactNode
  activeItem: boolean
}

export const DashboardDrawerItem: FC<DrawerItemProps> = ({ children, activeItem }) => {
  return (
    <div className='w-full flex item-center rounded-lg px-4 py-2 mb-2 font-bold cursor-pointer hover:bg-violet-600 hover:text-white transition-all'>
      {children}
    </div>
  )
}
