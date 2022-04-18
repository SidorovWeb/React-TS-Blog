import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Title } from '../Title/Title'
import { Fieldset } from '../UI/Fieldset/Fieldset'
import { MyButton } from '../UI/MyButton/MyButton'
import { Spin } from '../UI/Spin/Spin'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { useSelector } from '../../hooks/useTypedSelector'
import { SignUpData } from '../../types/registerTypes'

export const Register: FC = () => {
  const currentUser = useAuth()
  const { createUser } = useActions()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.register)

  useEffect(() => {
    if (currentUser) {
      navigate('/my-account/home')
    }
  }, [currentUser])

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignUpData) => {
    await new Promise((resolve) => resolve(createUser(data)))
    reset()
  }

  return (
    <div className='container mx-auto pt-7'>
      <Title title='Зарегистрироваться' />
      <div className='bg-white py-6 px-3 md:p-8 lg:p-16 rounded-lg'>
        <div className='w-full lg:w-8/12'>
          <form className='mb-10' onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              control={control}
              name='username'
              rules={{
                required: 'Поле обязательно',
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
                  labelText={'Username *'}
                >
                  {errors.username && <p className='text-red-600 mt-2'>{errors?.username?.message}</p>}
                </Fieldset>
              )}
            />

            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Поле обязательно',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите корректный email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Fieldset
                  type='email'
                  id='useremail'
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value.trim()}
                  labelText={'Email address *'}
                >
                  {errors.email && <p className='text-red-600 mt-2'>{errors?.email?.message}</p>}
                </Fieldset>
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{
                required: 'Поле обязательно',
                pattern: {
                  value: /^\S*$/,
                  message: 'Пароль не должен содержать пробелов',
                },
                minLength: { value: 6, message: 'Минимум 6 символов' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Fieldset
                  type='password'
                  id='userpassword'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value.trim()}
                  labelText={'Password *'}
                >
                  {errors.password && <p className='text-red-600 mt-2'>{errors?.password?.message}</p>}
                </Fieldset>
              )}
            />
            <MyButton
              className='btn py-4 disabled:opacity-60 disabled:cursor-not-allowed'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <Spin displayText='Обработка...' /> : 'Зарегистрироваться'}
            </MyButton>
          </form>
          <Link className='font-bold text-pink-600 underline' to={'/login'}>
            Войти в мою учётную запись
          </Link>
        </div>
      </div>
    </div>
  )
}
