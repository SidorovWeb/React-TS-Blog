import { FC, useState } from 'react'
import { IPostListProps } from '../../types/types'
import { myPostList } from '../../utils'
import { SidebarItem } from '../SidebarItem/SidebarItem'

export const Sidebar: FC = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])

  return (
    <aside className='md:mw-sidebar'>
      <div className='lg:sticky relative top-8'>
        <div className='mb-8'>
          <div className='bg-white p-8 pb-14 rounded-lg'>
            <h3 className='font-bold text-xl border-b pb-4 mb-8'>Недавние посты</h3>
            <div className=''>
              {postList.slice(-3).map((post) => (
                <SidebarItem post={post} key={post.id} />
              ))}
            </div>
          </div>
        </div>
        <div className='bg-white p-8 pb-10 rounded-lg'>
          <h3>Categories</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
      </div>
    </aside>
  )
}
