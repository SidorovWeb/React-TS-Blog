import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../Navbar/NavBar'

export const Header: FC = () => {
  const pathname = useLocation().pathname
  const styles = pathname !== '/my-account' ? 'w-full px-6' : 'headerHeight flex items-center w-full'
  const stylesContainer = pathname !== '/my-account' ? 'container mx-auto' : 'px-6 w-full'

  return (
    <header className={styles}>
      <div className={stylesContainer}>
        <NavBar />
      </div>
    </header>
  )
}
