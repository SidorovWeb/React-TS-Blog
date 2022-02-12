import { BookOpenIcon, CogIcon, TemplateIcon, ClipboardListIcon, UserGroupIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../types/userTypes'
import { DashboardDrawerItem } from './DashboardDrawerItem'

interface DashboardDrawerProps {
  user: User
}

export const DashboardDrawer: FC<DashboardDrawerProps> = ({ user }) => {
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
      {user.status === 'admin' && (
        <NavLink to={'/my-account/all_posts'}>
          <DashboardDrawerItem activeItem={false}>
            <ClipboardListIcon width={22} /> <span className='ml-2'>All posts</span>
          </DashboardDrawerItem>
        </NavLink>
      )}
      {user.status === 'admin' && (
        <NavLink to={'/my-account/all_users'}>
          <DashboardDrawerItem activeItem={false}>
            <UserGroupIcon width={22} /> <span className='ml-2'>All users</span>
          </DashboardDrawerItem>
        </NavLink>
      )}
      <NavLink to={'/my-account/tools'}>
        <DashboardDrawerItem activeItem={false}>
          <CogIcon width={22} /> <span className='ml-2'>Настройки</span>
        </DashboardDrawerItem>
      </NavLink>
    </div>
  )
}
