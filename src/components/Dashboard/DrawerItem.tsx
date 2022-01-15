import React, { FC } from 'react'

interface DrawerItemProps {
  children: React.ReactNode
  activeItem: boolean
}

export const DrawerItem: FC<DrawerItemProps> = ({ children, activeItem }) => {
  const initialStyles =
    'w-full flex item-center rounded-lg px-4 py-2 mb-2 font-bold cursor-pointer hover:bg-violet-600 transition-all'
  const styles = activeItem ? initialStyles + ' bg-violet-400 cursor-auto hover:bg-violet-400' : initialStyles
  return <div className={styles}>{children}</div>
}
