import { postListProps } from '../../types/postsTypes'

import List from '../List/List'
import { PostItem } from '../Posts/PostListItem'
import { useSelector } from '../../hooks/useTypedSelector'
import { SkeletonCard } from '../Skeleton/SkeletonCard'
import { ArticleCardLarge } from '../ArticleCardLarge/ArticleCardLarge'
import { SkeletonLarge } from '../Skeleton/SkeletonLarge'
import { HomeSidebar } from './HomeSidebar'
import { FC } from 'react'
import { uniqueListCategories } from '../../utils'

export const Home: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const users = useSelector((state) => state.user.users)
  const postsList = posts.filter((p) => p.status.type === 'published')
  const UniqueList: any = uniqueListCategories(postsList as [], 'name')

  return (
    <div className='container mx-auto md:pt-7'>
      <div className='w-full mb-5'>
        {posts.length > 0 ? (
          <ArticleCardLarge post={postsList[postsList.length - 1]} users={users} />
        ) : (
          <SkeletonLarge cl='h-[422px]' />
        )}
      </div>
      <div className='flex space-x-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow'>
          {isLoading ? (
            <>
              <SkeletonCard cl='h-[435px]' />
              <SkeletonCard cl='h-[435px]' />
            </>
          ) : (
            <List
              items={postsList.reverse().slice(1)}
              renderItem={(post: postListProps) => <PostItem post={post} key={post.id} users={users} />}
            />
          )}
        </div>
        <HomeSidebar UniqueList={UniqueList} isLoading={isLoading} />
      </div>
    </div>
  )
}
