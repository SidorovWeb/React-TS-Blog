import React from 'react'
import Background from '../images/bg.webp'
import { NavBar } from '../components/Navbar/NavBar'
import { AppRouter } from '../components/AppRouter/AppRouter'
import { Sidebar } from '../components/Sidebar/Sidebar'

export const Layout = () => {
  return (
    <div className='px-6 min-h-screen' style={{ background: `url(${Background}) no-repeat center/cover` }}>
      <header className='w-full'>
        <div className='container mx-auto'>
          <NavBar />
        </div>
      </header>
      <main className='w-full mt-10'>
        <div className='container mx-auto flex-1 flex gap-5'>
          <div className='flex-1'>
            <AppRouter />
          </div>
          <Sidebar />
        </div>
      </main>
    </div>
  )
}
