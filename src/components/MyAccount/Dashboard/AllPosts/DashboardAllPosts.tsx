import { FC } from 'react'
import { useSelector } from '../../../../hooks/useTypedSelector'
import { postListProps } from '../../../../types/postsTypes'
import List from '../../../List/List'
import { DashboardContainerContent } from '../DashboardContainerContent'
import { DashboardPost } from '../DashboardPost'

export const DashboardAllPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const allPostsPending = posts.filter((post) => post.status.type !== 'draft')

  allPostsPending.sort((a, b) => (a.status.type < b.status.type ? 1 : -1))

  return (
    <DashboardContainerContent>
      <div className='flex justify-between mb-6 text-black font-bold'>
        <span className='mr-4 text-xl font-bold '>Модерация постов</span>
        <span>постов: {allPostsPending.length}</span>
      </div>
      <div className='rounded-lg '>
        {!allPostsPending.length && <p className='font-bold text-2xl mt-10 text-black'>Список постов пуст</p>}
        {!isLoading && (
          <List
            items={allPostsPending.reverse()}
            renderItem={(post: postListProps) => <DashboardPost post={post} key={post.id} />}
          />
        )}
      </div>
    </DashboardContainerContent>
  )
}
