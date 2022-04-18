import { FC } from 'react'
import { DashboardHomeContent } from './DashboardHomeContent'
import { useSelector } from '../../../../hooks/useTypedSelector'

export const DashboardHome: FC = () => {
  const { user, isLoading } = useSelector((state) => state.user)

  return <DashboardHomeContent user={user} isLoading={isLoading} />
}
