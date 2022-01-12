import { FC } from 'react'
import { ReactComponent as SpinIcon } from '../../../icons/spin.svg'

interface SpinProps {
  displayText: string
}

export const Spin: FC<SpinProps> = ({ displayText }) => {
  return (
    <div className='flex items-center'>
      <SpinIcon />
      {displayText}
    </div>
  )
}
