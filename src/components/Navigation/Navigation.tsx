import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className='flex'>
      <Link className='ml-2 font-bold py-2 px-4 hover' to='/archives'>
        Статьи
      </Link>
      <Link className='ml-2 font-bold py-2 px-4 hover' to='/contacts'>
        Contacts
      </Link>
    </div>
  )
}

// NavLink
