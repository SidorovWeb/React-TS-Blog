import { PhotographIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../../hooks/useTypedSelector'
import { Profile } from '../../Profile/Profile'
import { Spin } from '../../UI/Spin/Spin'
import { userUpdate } from '../../../store/action-creators/userAction'
import { storage, storageDelete } from '../../../store/action-creators/storageAction'
import { Timestamp } from 'firebase/firestore'

export const DashboardTools: FC = () => {
  const { user } = useSelector((state) => state.user)
  const { isLoading } = useSelector((state) => state.storage)
  const dispatch = useDispatch()

  const onChangeFile = async (event: any) => {
    const file = event.target.files[0]

    // TODO: сделать загрузку фото как в посте

    if (file) {
      const fileLocated = `${user.uid}/${Timestamp.now() + file.name}`
      if (user.userPhoto.url) {
        dispatch(storageDelete(user.userPhoto.fileLocated))
      }
      const url = await new Promise((resolve) => resolve(dispatch(storage(file, fileLocated))))
      dispatch(
        userUpdate({
          ...user,
          userPhoto: {
            url: String(url),
            fileLocated,
          },
        })
      )
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
