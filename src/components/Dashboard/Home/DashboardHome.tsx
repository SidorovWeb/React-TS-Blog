import { FC } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { DashboardHomeContent } from './DashboardHomeContent'
import { DashboardSidebar } from '../DashboardSidebar'

export const DashboardHome: FC = () => {
  const { user, isLoading } = useAuth()

  return (
    <>
      <DashboardHomeContent user={user} isLoading={isLoading} />
      <DashboardSidebar />
    </>
  )
}
