import { FC } from 'react'
import { ReactComponent as LogoIcon } from '../../icons/reactLogo.svg'

interface LogoProps {
  width: string
  textSize: string
}

export const Logo: FC<LogoProps> = ({ width, textSize }) => {
  const text = `font-bold ml-3 mt-1 text-white  ${textSize}`

  return (
    <div className='flex items-center'>
      <LogoIcon width={width} />
      <span className={text}>React</span>
    </div>
  )
}
