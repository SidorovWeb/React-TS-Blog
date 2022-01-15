import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { myPostList } from '../../utils'
import { DashboardContent } from './DashboardContent'
import { DashboardSidebar } from './DashboardSidebar'

export const DashboardHome: FC = () => {
  const { user } = useAuth()

  return (
    <>
      <DashboardContent user={user} postList={myPostList} />
      <DashboardSidebar />
    </>
  )
}
