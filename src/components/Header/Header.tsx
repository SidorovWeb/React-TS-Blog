import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { isDefinitePath } from '../../utils'
import { NavBar } from '../Navbar/NavBar'

export const Header: FC = () => {
  const pathname = useLocation().pathname
  const styles = isDefinitePath(pathname) ? 'headerHeight flex items-center w-full' : 'w-full px-6'
  const stylesContainer = isDefinitePath(pathname) ? 'px-6 w-full' : 'container mx-auto'

  return (
    <header className={styles}>
      <div className={stylesContainer}>
        <NavBar />
      </div>
    </header>
  )
}
