import { FC } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { IPostListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'

export const DashboardMyPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const userPosts = posts.filter((post) => post.uid === user.id)

  return (
    <div className='flex-grow pb-14 bg-gray-100 px-6 pt-6 rounded-lg'>
      <div className='flex justify-between mb-6 text-gray-700 font-bold'>
        <span className='mr-4 text-xl'>Мои посты</span>
        <span>постов: {userPosts.length}</span>
      </div>
      <div className='rounded-lg '>
        {!userPosts.length && <p className='font-bold text-2xl mt-10'>Список постов пуст</p>}
        {!isLoading && (
          <List
            items={userPosts.reverse()}
            renderItem={(post: IPostListProps) => (
              <DashboardPost post={post} key={post.id} uid={user.id} myPosts={true} />
            )}
          />
        )}
      </div>
    </div>
  )
}
