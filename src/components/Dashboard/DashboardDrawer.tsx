import { BookOpenIcon, CogIcon, TemplateIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { DashboardDrawerItem } from './DashboardDrawerItem'

export const DashboardDrawer: FC = () => {
  return (
    <div className='text-white xl:w-60 pr-6 pt-24 dashboard-drawer__list'>
      <NavLink to={'/my-account/home'}>
        <DashboardDrawerItem activeItem={true}>
          <TemplateIcon width={22} /> <span className='ml-2'>Главная</span>
        </DashboardDrawerItem>
      </NavLink>
      <NavLink to={'/my-account/posts'}>
        <DashboardDrawerItem activeItem={false}>
          <BookOpenIcon width={22} /> <span className='ml-2'>Мои посты</span>
        </DashboardDrawerItem>
      </NavLink>
      <NavLink to={'/my-account/tools'}>
        <DashboardDrawerItem activeItem={false}>
          <CogIcon width={22} /> <span className='ml-2'>Настройки</span>
        </DashboardDrawerItem>
      </NavLink>
    </div>
  )
}
