import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className='flex'>
      <Link className='ml-2 font-bold py-2 px-4 hover:opacity-80 transition-all' to='/archives'>
        Articles
      </Link>
      <Link className='ml-2 font-bold py-2 px-4 hover:opacity-80 transition-all' to='/Categories'>
        Categories
      </Link>
      <Link className='ml-2 font-bold py-2 px-4 hover:opacity-80 transition-all' to='/contacts'>
        Contacts
      </Link>
    </div>
  )
}

// NavLink
