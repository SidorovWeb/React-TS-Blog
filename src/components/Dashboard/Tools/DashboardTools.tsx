import { PhotographIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../../hooks/useTypedSelector'
import { Profile } from '../../Profile/Profile'
import { Spin } from '../../UI/Spin/Spin'
import { storage } from '../../../store/action-creators/storageAction'

export const DashboardTools: FC = () => {
  const { user } = useSelector((state) => state.user)
  const { isLoading } = useSelector((state) => state.storage)
  const dispatch = useDispatch()

  const onChangeFile = async (event: any) => {
    const file = event.target.files[0]

    if (file) {
      dispatch(storage('users', user, file))
    }
  }

  return (
    <div className='flex-grow pb-14 bg-gray-100 px-6 pt-6 rounded-lg'>
      <div className='flex items-center'>
        <Profile user={user} width='80px' height='80px' />
        <div className='ml-4'>
          <input
            className='hidden opacity-0 w-0'
            type='file'
            accept='image/*'
            id='imageInput'
            onChange={(e) => onChangeFile(e)}
          />
          {isLoading ? (
            <Spin displayText='...загрузка' />
          ) : (
            <label className=' p-2 cursor-pointer inline-flex items-center  rounded-lg btn ' htmlFor='imageInput'>
              <PhotographIcon width={26} /> <p className='ml-1'>Загрузить фото</p>
            </label>
          )}
        </div>
      </div>
    </div>
  )
}
