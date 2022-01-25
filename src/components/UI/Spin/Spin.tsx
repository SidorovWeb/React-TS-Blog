import { RefreshIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface SpinProps {
  displayText: string
}

export const Spin: FC<SpinProps> = ({ displayText }) => {
  return (
    <div className='flex items-center'>
      <RefreshIcon className='animate-spin' width={20} />
      <p className='ml-2'>{displayText}</p>
    </div>
  )
}
