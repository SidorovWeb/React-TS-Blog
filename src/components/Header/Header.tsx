import { FC } from 'react'
import { NavBar } from '../Navbar/NavBar'

export const Header: FC = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-[1010] bg-gray-100/90 dark:bg-slate-800/90 bg-blur headerHeight flex items-center w-full py-4 px-3 lg:px-6'>
      <div className='w-full'>
        <NavBar />
      </div>
    </header>
  )
}
