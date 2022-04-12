import { FC } from 'react'

interface SkeletonListProps {
  cl?: string
}

export const SkeletonList: FC<SkeletonListProps> = ({ cl }) => {
  return (
    <div className={`flex flex-col justify-between animate-pulse space-y-4 ${cl}`}>
      <div className='h-5 dark:bg-gray-100 bg-slate-800 w-1/2 rounded-lg overflow-hidden mb-6'></div>
      <div className='space-y-4'>
        <div className='h-5 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
        <div className='h-5 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
        <div className='h-5 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
        <div className='h-5 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
      </div>
      <div className='h-4 mx-auto dark:bg-gray-100 bg-slate-800 w-1/4 rounded-lg overflow-hidden'></div>
    </div>
  )
}
