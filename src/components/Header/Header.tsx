import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { isMyAccount } from '../../utils'
import { NavBar } from '../Navbar/NavBar'

export const Header: FC = () => {
  const pathname = useLocation().pathname
  const styles = isMyAccount(pathname) ? 'headerHeight flex items-center w-full' : 'w-full px-6'
  const stylesContainer = isMyAccount(pathname) ? 'px-6 w-full' : 'container mx-auto'

  return (
    <header className={styles}>
      <div className={stylesContainer}>
        <NavBar />
      </div>
    </header>
  )
}
