import { FC } from 'react'
import { Link } from 'react-router-dom'
import { SkeletonList } from '../Skeleton/SkeletonList'
import { HomeSidebarCategoryPost } from './HomeSidebarCategoryPost'

interface HomeSidebarProps {
  UniqueList: []
  isLoading: boolean
}

export const HomeSidebar: FC<HomeSidebarProps> = ({ UniqueList, isLoading }) => {
  return (
    <aside className='md:w-[370px] hidden lg:block'>
      <>
        {isLoading ? (
          <SkeletonList cl='h-[275px]' />
        ) : (
          <div className='relative lg:sticky top-24 shadow-lg'>
            <div className='bg-white px-8 py-4 pb-10 rounded-lg mb-8'>
              <h3 className='font-bold text-xl pb-4 mb-4 text-gray-900'>Категории</h3>
              {UniqueList.slice(0, 3).map((item, idx) => (
                <HomeSidebarCategoryPost item={item} key={idx} />
              ))}
              <div className='text-center mt-10'>
                <Link className='p-2 font-bold hover text-gray-700' to={'/archives'}>
                  Все категории
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    </aside>
  )
}
