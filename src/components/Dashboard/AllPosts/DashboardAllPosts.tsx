import React, { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { IPostListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'

export const DashboardAllPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const allPostsPending = posts.filter((post) => post.status.type !== 'draft')

  allPostsPending.sort((a, b) => (a.status.type < b.status.type ? 1 : -1))

  return (
    <div className='flex-grow pb-14 bg-gray-100 px-6 pt-6 rounded-lg'>
      <div className='flex justify-between mb-6 text-gray-700 font-bold'>
        <span className='mr-4 text-xl font-bold'>Модерация постов</span>
        <span>постов: {allPostsPending.length}</span>
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
