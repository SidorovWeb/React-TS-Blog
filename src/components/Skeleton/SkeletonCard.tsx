import { FC } from 'react'

interface SkeletonCardProps {
  cl?: string
}

export const SkeletonCard: FC<SkeletonCardProps> = ({ cl }) => {
  return (
    <div className={`animate-pulse ${cl}`}>
      <div className='dark:bg-gray-100 rounded-lg overflow-hidden bg-slate-800 w-full h-2/3 mb-2'></div>
      <div className='space-y-2'>
        <div className='h-10 w-10 rounded-full dark:bg-gray-100 bg-slate-800'></div>
        <div className='h-4 dark:bg-gray-100 bg-slate-800 w-1/4 rounded-lg overflow-hidden'></div>
        <div className='h-26 dark:bg-gray-100 bg-slate-800 w-full rounded-lg overflow-hidden'></div>
        <div className='h-6 dark:bg-gray-100 bg-slate-800 w-2/3 rounded-lg overflow-hidden'></div>
      </div>
    </div>
  )
}
