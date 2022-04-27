import React, { FC } from 'react'

interface DashboardContainerContentProps {
  children: React.ReactNode
}

export const DashboardContainerContent: FC<DashboardContainerContentProps> = ({ children }) => {
  return <div className='flex-grow pb:8 md:pt-4 rounded-lg font-bold'>{children}</div>
}
