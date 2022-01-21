import { FC } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from '../../../hooks/useTypedSelector'
import { DashboardHomeContent } from './DashboardHomeContent'
import { DashboardSidebar } from '../DashboardSidebar'

export const DashboardHome: FC = () => {
  const { user } = useAuth()
  const { posts, isLoading } = useSelector((state) => state.post)

  return (
    <>
      <DashboardHomeContent user={user} postList={posts} isLoading={isLoading} />
      <DashboardSidebar />
    </>
  )
}
