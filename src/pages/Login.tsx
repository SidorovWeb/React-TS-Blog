import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { MyButton } from '../components/UI/MyButton/MyButton'

export const Login: FC = () => {
  return (
    <div className='container'>
      <span className='text-5xl font-bold text-white pt-3 pb-12 block'>Войти в мою учётную запись</span>
      <div className='bg-white p-16 rounded-lg'>
        <div className='w-8/12'>
          <form className='text-lg mb-10'>
            <fieldset className='mb-10'>
              <label htmlFor='useremail'>Email address *</label>
              <input
                className='bg-gray-200 w-full text-xl py-2 px-4 rounded-lg border-2 transition-all'
                type='email'
                id='useremail'
                name='useremail'
              />
            </fieldset>
            <fieldset className='mb-10'>
              <label htmlFor='userpassword'>Password *</label>
              <input
                className='bg-gray-200 w-full text-xl py-2 px-4 rounded-lg border-2 transition-all'
                type='password'
                id='userpassword'
                name='userpassword'
              />
            </fieldset>

            <MyButton className='btn py-4'>Войти</MyButton>
          </form>
          <Link className='font-bold text-pink-600 underline' to={'/register'}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  )
}
