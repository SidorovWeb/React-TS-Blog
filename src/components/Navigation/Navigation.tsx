import { FC } from 'react'
import { Link } from 'react-router-dom'

interface NavigationProps {
  onClickMenu: () => void
}

export const Navigation: FC<NavigationProps> = ({ onClickMenu }) => {
  return (
    <div className='flex flex-col lg:flex-row order-1 lg:-order-none mt-6 lg:mt-0 mr-2'>
      <Link className='font-bold py-2 px-2 hover' to='/' onClick={onClickMenu}>
        Главная
      </Link>
      <Link className='font-bold py-2 px-2 hover' to='/archives' onClick={onClickMenu}>
        Статьи
      </Link>
    </div>
  )
}
