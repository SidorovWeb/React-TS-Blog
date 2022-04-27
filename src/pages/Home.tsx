import { postListProps } from '../types/postsTypes'

import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { useSelector } from '../hooks/useTypedSelector'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
import { ArticleCardLarge } from '../components/ArticleCardLarge/ArticleCardLarge'
import { SkeletonLarge } from '../components/Skeleton/SkeletonLarge'
import { FC } from 'react'
import { uniqueListCategories } from '../utils'
import { SkeletonList } from '../components/Skeleton/SkeletonList'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
  const { posts } = useSelector((state) => state.post)
  const users = useSelector((state) => state.user.users)
  const postsList = posts.filter((p) => p.status.type === 'published')
  const UniqueList: any[] = uniqueListCategories(postsList as [], 'value')

  return (
    <div className='container mx-auto md:pt-7'>
      <div className='w-full mb-5'>
        {!postsList.length ? (
          <SkeletonLarge cl='h-[422px]' />
        ) : (
          <ArticleCardLarge post={postsList[postsList.length - 1]} users={users} />
        )}
      </div>
      <div className='flex space-x-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 flex-grow w-full'>
          {!postsList.length ? (
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
        <aside className='md:w-[370px] hidden lg:block'>
          <>
            {!postsList.length ? (
              <SkeletonList cl='h-[275px]' />
            ) : (
              <div className='relative lg:sticky top-24 shadow-lg  rounded-lg overflow-hidden'>
                <div className='bg-gray-100 dark:bg-slate-700 px-8 py-6'>
                  <h3 className='font-bold text-xl pb-4 mb-4 text-gray-700 dark:text-white'>Категории</h3>
                  {UniqueList.slice(0, 4).map((item, idx) => (
                    <div className='w-full border-b' key={idx}>
                      <Link
                        className='text-base truncate overflow-hidden block p-2 hover:opacity-60 transition-opacity text-gray-700 dark:text-white font-bold'
                        style={{ width: '220px' }}
                        to={`/archives`}
                        state={item}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                  <div className='text-center mt-10'>
                    <Link
                      className='p-2 font-bold hover:opacity-60 transition-opacity text-gray-700 dark:text-white'
                      to={'/archives'}
                    >
                      Все категории
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        </aside>
      </div>
    </div>
  )
}
