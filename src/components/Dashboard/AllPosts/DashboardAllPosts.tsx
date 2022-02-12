import React, { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { IPostListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'

export const DashboardAllPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const allPostsPending = posts.filter((post) => post.status !== 'draft')

  return (
    <div className='flex-grow pb-14 bg-gray-100 px-6 pt-6 rounded-lg'>
      <div className='flex justify-end mb-6 text-gray-700'>
        <span className='text-xl font-bold'>Постов: {allPostsPending.length}</span>
      </div>
      <div className='rounded-lg '>
        {!allPostsPending.length && <p className='font-bold text-2xl mt-10'>Список постов пуст</p>}
        {!isLoading && (
          <List
            items={allPostsPending.reverse()}
            renderItem={(post: IPostListProps) => <DashboardPost post={post} key={post.id} />}
          />
        )}
      </div>
    </div>
  )
}
