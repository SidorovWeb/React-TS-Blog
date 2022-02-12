import { FC } from 'react'
import { DashboardHomeContent } from './DashboardHomeContent'
import { DashboardSidebar } from '../DashboardSidebar'
import { useSelector } from '../../../hooks/useTypedSelector'
import { MyButton } from '../../UI/MyButton/MyButton'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { userType } from '../../../types/userTypes'
import { defaultUser } from '../../../constants'

export const DashboardHome: FC = () => {
  const { user, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser')
        dispatch({
          type: userType.USER_READ_SUCCESS,
          payload: defaultUser,
        })
        navigate('/')

        toast.success('Вы успешно вышли')
      })
      .catch((error) => toast.error(error.message))
  }
  return (
    <>
      <DashboardHomeContent user={user} isLoading={isLoading} />
      <DashboardSidebar>
        <MyButton
          className='font-bold text-red-600 py-2 px-4 w-full hover:bg-red-600 hover:text-white rounded-lg transition-all'
          onClick={onLogout}
        >
          Выйти
        </MyButton>
      </DashboardSidebar>
    </>
  )
}
