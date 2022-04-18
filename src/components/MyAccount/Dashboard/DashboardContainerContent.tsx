import React, { FC } from 'react'

interface DashboardContainerContentProps {
  children: React.ReactNode
}

export const DashboardContainerContent: FC<DashboardContainerContentProps> = ({ children }) => {
  return <div className='flex-grow pb:8 md:pb-14 md:bg-gray-100 md:px-6 md:pt-6 rounded-lg font-bold'>{children}</div>
}
