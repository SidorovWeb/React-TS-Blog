import { FC } from 'react'

interface SkeletonLargeProps {
  cl?: string
}

export const SkeletonLarge: FC<SkeletonLargeProps> = ({ cl }) => {
  return (
    <div className={`animate-pulse lg:space-x-6 flex flex-col lg:flex-row ${cl}`}>
      <div className='dark:bg-gray-100 rounded-lg overflow-hidden bg-slate-800 w-full lg:w-1/2 lg:h-full'></div>
      <div className='flex-1 space-y-6'>
        <div className='h-6 mt-10 dark:bg-gray-100 bg-slate-800 w-full rounded-lg overflow-hidden'></div>
        <div className='h-1/2 dark:bg-gray-100 bg-slate-800 w-full rounded-lg overflow-hidden'></div>
        <div className='flex items-center space-x-6'>
          <div className='h-10 w-10 rounded-full dark:bg-gray-100 bg-slate-800'></div>
          <div className='h-6 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
        </div>
      </div>
    </div>
  )
}
