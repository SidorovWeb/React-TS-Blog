import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface SidebarCategoryPostProps {
  item: {
    name: string
    slug: string
  }
}

export const SidebarCategoryPost: FC<SidebarCategoryPostProps> = ({ item }) => {
  return (
    <div className='w-full border-b mb-2'>
      <Link
        className='text-lg truncate overflow-hidden block p-2 hover:opacity-60 transition-all text-gray-700 font-bold'
        style={{ width: '220px' }}
        to={`/archives/${item.slug}`}
        state={item}
      >
        {item.name}
      </Link>
    </div>
  )
}
