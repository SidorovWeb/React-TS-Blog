import { useSelector } from './useTypedSelector'

export const useAuth = () => {
  const { user, isLoading } = useSelector((state) => state.user)

  return {
    user,
    isLoading,
    isUser: !!user.id,
  }
}
