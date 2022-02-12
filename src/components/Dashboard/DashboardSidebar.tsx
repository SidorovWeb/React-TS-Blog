import { FC } from 'react'

interface DashboardSidebarProps {
  children: React.ReactNode
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ children }) => {
  return (
    <div className='xl:w-60 shrink-0'>
      <div className='bg-gray-100 p-6 rounded-lg text-center font-bold'>{children}</div>
    </div>
  )
}
