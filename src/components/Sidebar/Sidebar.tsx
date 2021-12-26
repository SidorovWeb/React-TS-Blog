import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/types'
import { myPostList, uniqueListOfObject } from '../../utils'
import { SidebarCategoryPost } from './SidebarCategoryPost'
import { SidebarRecentPost } from './SidebarRecentPost'

export const Sidebar: FC = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])
  const categoryList = postList.map(({ categories }) => categories)
  const UniqueList = uniqueListOfObject(categoryList as [], 'name')

  return (
    <aside className='md:mw-sidebar'>
      <div className='lg:sticky relative top-8'>
        <div className='mb-8'>
          <div className='bg-white p-8 pb-14 rounded-lg'>
            <h3 className='font-bold text-xl border-b pb-4 mb-8'>Недавние посты</h3>
            <div className=''>
              {postList
                .slice(-3)
                .reverse()
                .map((post) => (
                  <SidebarRecentPost post={post} key={post.id} />
                ))}
            </div>
          </div>
        </div>
        <div className='bg-white p-8 pb-10 rounded-lg'>
          <h3 className='font-bold text-xl border-b pb-4 mb-8'>Categories</h3>
          {UniqueList.map((item, idx) => (
            <SidebarCategoryPost item={item} key={idx} />
          ))}

          <div className='text-center mt-10'>
            <Link className='p-2 text-pink-500 hover:text-pink-400 transition-all' to={'categories'}>
              Все категории
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
