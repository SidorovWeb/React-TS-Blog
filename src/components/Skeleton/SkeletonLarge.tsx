import { FC } from 'react'

interface SkeletonLargeProps {
  cl?: string
}

export const SkeletonLarge: FC<SkeletonLargeProps> = ({ cl }) => {
  return (
    <div
      className={`animate-pulse lg:space-x-6 flex flex-col lg:flex-row ${cl} dark:bg-gray-100/30 bg-slate-800/30 p-8 rounded-lg`}
    >
      <div className='rounded-lg overflow-hidden w-full lg:w-1/2 lg:h-full bg-gray-100/30 dark:bg-slate-800/30'></div>
      <div className='flex-1 space-y-6'>
        <div className='h-6 mt-10  w-full rounded-lg overflow-hidden bg-gray-100/30 dark:bg-slate-800/30'></div>
        <div className='h-1/2  w-full rounded-lg overflow-hidden bg-gray-100/30 dark:bg-slate-800/30'></div>
        <div className='flex items-center space-x-6'>
          <div className='h-10 w-10 rounded-full bg-gray-100/30 dark:bg-slate-800/30'></div>
          <div className='h-6  w-2/3 rounded-lg overflow-hidden bg-gray-100/30 dark:bg-slate-800/30'></div>
        </div>
      </div>
    </div>
  )
}
