import { FC } from 'react'

interface SkeletonCardProps {
  cl?: string
}

export const SkeletonCard: FC<SkeletonCardProps> = ({ cl }) => {
  return (
    <div className={`animate-pulse ${cl} p-8 dark:bg-gray-100/30 bg-slate-800/30 rounded-lg`}>
      <div className='rounded-lg overflow-hidden w-full h-2/3 mb-2 bg-gray-100/30 dark:bg-slate-800/30'></div>
      <div className='space-y-2'>
        <div className='h-10 w-10 rounded-full bg-gray-100/30 dark:bg-slate-800/30'></div>
        <div className='h-4 bg-gray-100/30 dark:bg-slate-800/30 w-1/4 rounded-lg overflow-hidden'></div>
        <div className='h-26 bg-gray-100/30 dark:bg-slate-800/30 w-full rounded-lg overflow-hidden'></div>
        <div className='h-6 bg-gray-100/30 dark:bg-slate-800/30 w-2/3 rounded-lg overflow-hidden'></div>
      </div>
    </div>
  )
}
