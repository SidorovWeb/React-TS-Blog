import { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { IPostListProps } from '../../../types/posts'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'

export const DashboardPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const userPosts = posts.filter((post) => post.uid === user.id)

  return (
    <div className='flex-grow p-4'>
      <div className='flex justify-end mb-6 text-gray-700'>
        <span className='text-xl font-bold'>Постов: {userPosts.length}</span>
      </div>
      <div className='rounded-lg '>
        {!userPosts.length && <p className='font-bold text-2xl mt-10'>Список постов пуст &#128546;</p>}
        {!isLoading && (
          <List
            items={userPosts.reverse()}
            renderItem={(post: IPostListProps) => <DashboardPost post={post} key={post.id} uid={user.id} />}
          />
        )}
      </div>
    </div>
  )
}
