import React, { FC } from 'react'
import { myPostList } from '../../utils/index'

export const Sidebar: FC = () => {
  // const [postList, setPostList] = useState([...myPostList])

  return (
    <aside className='md:col-span-3'>
      <div className='lg:sticky relative top-8'>
        <div className='mb-8 bg-white'>
          <h3>Recent Posts</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <div className='bg-white'>
          <h3>Categories</h3>
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
      </div>
    </aside>
  )
}
