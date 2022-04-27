import { FC } from 'react'

interface SkeletonListProps {
  cl?: string
}

export const SkeletonList: FC<SkeletonListProps> = ({ cl }) => {
  return (
    <div
      className={`flex flex-col justify-between animate-pulse space-y-4 ${cl} dark:bg-gray-100/30 bg-slate-800/30 rounded-lg overflow-hidden py-4 px-8`}
    >
      <div className='h-5 bg-gray-100/30 dark:bg-slate-800/30 w-1/2 rounded-lg overflow-hidden mx-auto'></div>
      <div className='space-y-4'>
        <div className='h-5 bg-gray-100/30 dark:bg-slate-800/30 w-full rounded-lg overflow-hidden'></div>
        <div className='h-5 bg-gray-100/30 dark:bg-slate-800/30 w-full rounded-lg overflow-hidden'></div>
        <div className='h-5 bg-gray-100/30 dark:bg-slate-800/30 w-full rounded-lg overflow-hidden'></div>
        <div className='h-5 bg-gray-100/30 dark:bg-slate-800/30 w-full rounded-lg overflow-hidden'></div>
      </div>
      <div className='h-4 mx-auto bg-gray-100/30 dark:bg-slate-800/30 w-1/2 rounded-lg overflow-hidden  mx-auto'></div>
    </div>
  )
}
