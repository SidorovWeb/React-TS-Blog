import { PhotographIcon } from '@heroicons/react/outline'
import { FC, useEffect } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { Profile } from '../../Profile/Profile'
import { Spin } from '../../UI/Spin/Spin'
import { Timestamp } from 'firebase/firestore'
import { Fieldset } from '../../UI/Fieldset/Fieldset'
import { Controller, useForm } from 'react-hook-form'
import { MyButton } from '../../UI/MyButton/MyButton'
import { User } from '../../../types/userTypes'
import { toast } from 'react-toastify'
import { DashboardContainerContent } from '../DashboardContainerContent'
import { useActions } from '../../../hooks/useActions'

export const DashboardTools: FC = () => {
  const { user } = useSelector((state) => state.user)
  const { isLoading } = useSelector((state) => state.storage)
  const { userUpdate, storage, storageDelete } = useActions()

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: user.userName,
    },
  })

  useEffect(() => {
    if (user) {
      setValue('username', user.userName)
    }
  }, [user])

  const onSubmit = async (data: any) => {
    const newUser: User = {
      ...user,
      userName: data.username.trim(),
    }

    await new Promise((resolve) => resolve(userUpdate(newUser)))
    toast.success('Успешно сохранено')
  }

  const onChangeFile = async (event: any) => {
    const file = event.target.files[0]

    if (file) {
      const fileLocated = `${user.uid}/${Timestamp.now() + file.name}`
      if (user.userPhoto.url) {
        storageDelete(user.userPhoto.fileLocated)
      }
      const url = await new Promise((resolve) => resolve(storage(file, fileLocated)))

      userUpdate({
        ...user,
        userPhoto: {
          url: String(url),
          fileLocated,
        },
      })
    }
  }

  return (
    <DashboardContainerContent>
      <div className='flex flex-col'>
        <div className='mr-4 text-xl  mb-6'>Мои настройки</div>
        <div className='flex items-center flex-col md:flex-row mb-8'>
          <Profile authorPhotoUrl={user.userPhoto.url} author={user.userName} width='80px' height='80px' />
          <div className='ml-0 md:ml-4 mt-6 md:mt-0'>
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
              <label className=' p-2 cursor-pointer inline-flex items-center  rounded-lg btn' htmlFor='imageInput'>
                <PhotographIcon width={26} /> <p className='ml-1'>Загрузить фото</p>
              </label>
            )}
          </div>
        </div>
        <div className='text-xl mb-5 '>Персональная информация</div>
        <form className='mb-10 max-w-md' onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name='username'
            rules={{
              required: 'Поле не должно быть пустым',
              pattern: {
                value: /^([^0-9]*)$/,
                message: 'Имя не должно содержать цифр',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Fieldset
                type='text'
                id='username'
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                labelText='Имя пользователя'
              >
                {errors.username && <p className='text-red-600 mt-2'>{errors?.username?.message}</p>}
              </Fieldset>
            )}
          />
          <MyButton className='btn py-4 disabled:opacity-60 disabled:cursor-not-allowed' type='submit'>
            Сохранить
          </MyButton>
        </form>
      </div>
    </DashboardContainerContent>
  )
}
