import { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { IPostListProps } from '../../../types/posts'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'

export const DashboardPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)

  return (
    <div className='flex-grow p-4'>
      <div className='flex justify-end mb-6 text-gray-700'>
        <span className='text-xl font-bold'>Постов: {posts.length}</span>
      </div>
      <div className='rounded-lg '>
        {!posts.length && <p className='font-bold text-2xl mt-10'>Список постов пуст &#128546;</p>}
        {!isLoading && (
          <List
            items={posts.reverse()}
            renderItem={(post: IPostListProps) => <DashboardPost post={post} key={post.id} />}
          />
        )}
      </div>
    </div>
  )
}
