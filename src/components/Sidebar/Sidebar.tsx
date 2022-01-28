import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPostListProps } from '../../types/postsTypes'
import { myPostList, uniqueListCategories } from '../../utils'
import { SidebarCategoryPost } from './SidebarCategoryPost'
import { SidebarRecentPost } from './SidebarRecentPost'

export const Sidebar: FC = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])
  const UniqueList = uniqueListCategories(postList as [], 'name')

  return (
    <aside className='md:mw-sidebar'>
      <div className='lg:sticky relative top-8'>
        <div className='mb-8'>
          <div className='bg-white p-4 pb-14 rounded-lg'>
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
        <div className='bg-white p-4 pb-10 rounded-lg'>
          <h3 className='font-bold text-xl border-b pb-4 mb-8'>Categories</h3>
          {UniqueList.map((item, idx) => (
            <SidebarCategoryPost item={item} key={idx} />
          ))}

          <div className='text-center mt-10'>
            <Link className='p-2 font-bold hover' to={'/archives'}>
              Все категории
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
