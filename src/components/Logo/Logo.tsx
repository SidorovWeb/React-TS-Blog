import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../../icons/reactLogo.svg'

export const Logo: FC = () => {
  return (
    <Link className='mr-auto z-[1002]' to='/'>
      <div className='flex items-center'>
        <LogoIcon className='w-6 xl:w-11' />
        <span className='font-bold ml-1 xl:ml-3 mt-1 text-lg xl:text-4xl'>ReactProger</span>
      </div>
    </Link>
  )
}
