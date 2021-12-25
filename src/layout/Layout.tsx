import React from 'react'
import Background from '../images/bg.webp'
import { NavBar } from '../components/Navbar/NavBar'
import { AppRouter } from '../components/AppRouter/AppRouter'
import { Sidebar } from '../components/Sidebar/Sidebar'

export const Layout = () => {
  return (
    <div className='px-6 min-h-screen' style={{ background: `url(${Background}) no-repeat center/cover` }}>
      <div className='grid md:grid-cols-12 gap-5  container mx-auto '>
        <header className='md:col-span-12'>
          <NavBar />
        </header>
        <main className='md:col-span-9'>
          <AppRouter />
        </main>
        <Sidebar />
      </div>
    </div>
  )
}
