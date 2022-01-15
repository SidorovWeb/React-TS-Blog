import { BookOpenIcon, CogIcon, TemplateIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { DrawerItem } from './DrawerItem'

export const Drawer: FC = () => {
  return (
    <div className='text-white md:account-sidebar pr-6 pt-24'>
      <DrawerItem activeItem={true}>
        <TemplateIcon width={22} /> <span className='ml-2'>Home</span>
      </DrawerItem>
      <DrawerItem activeItem={false}>
        <BookOpenIcon width={22} /> <span className='ml-2'>Posts</span>
      </DrawerItem>
      <DrawerItem activeItem={false}>
        <CogIcon width={22} /> <span className='ml-2'>Tools</span>
      </DrawerItem>
    </div>
  )
}
