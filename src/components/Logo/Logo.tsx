import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../../icons/reactLogo.svg'

interface LogoProps {
  width: string
  textSize: string
}

export const Logo: FC<LogoProps> = ({ width, textSize }) => {
  const pathname = useLocation().pathname
  const text = `font-bold ml-3 mt-1 text-white  ${textSize}`

  return pathname === '/' ? (
    <div className='flex items-center'>
      <LogoIcon width={width} />
      <span className={text}>ReactProger</span>
    </div>
  ) : (
    <Link to='/'>
      <div className='flex items-center'>
        <LogoIcon width={width} />
        <span className={text}>ReactProger</span>
      </div>
    </Link>
  )
}
