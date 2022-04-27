import { useEffect, useState } from 'react'
import { FC } from 'react'
import { Categories, postListProps } from '../types/postsTypes'
import { getArrRange, uniqueListCategories, wordForm } from '../utils'
import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { Pagination } from '../components/Pagination/Pagination'
import { useLocation } from 'react-router-dom'
import { useSelector } from '../hooks/useTypedSelector'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
import { Title } from '../components/Title/Title'
import Select from 'react-select'

export const Archive: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const { users } = useSelector((state) => state.user)
  const postList = posts.filter((p) => p.status.type === 'published')
  const [filteredPostList, setFilteredPostList] = useState<any>([])
  let UniqueList: Categories[] = uniqueListCategories(postList as [], 'value')
  UniqueList.unshift({ value: 'all', label: 'Все статьи' })

  const [part] = useState(3)
  const [page, setPage] = useState(1)
  const [currentSelect, setCurrentSelect] = useState<Categories>()
  const location = useLocation()

  useEffect(() => {
    const state = location.state as Categories

    if (state !== null) {
      onChange(location.state)
      return
    }
    onChange({ value: 'all', label: 'Все статьи' })
  }, [posts])

  const changePage = (page: number) => {
    setPage(page)
  }

  const onChange = (newValue: any) => {
    if (newValue.value === 'all') {
      setFilteredPostList(postList)
      setCurrentSelect(newValue)
      return
    }

    const categoriesList = postList.filter(
      (post) => post.categories.some((cat) => cat.value.toLowerCase() === newValue.value.toLowerCase()) && post
    )
    setCurrentSelect(newValue)
    setPage(1)
    setFilteredPostList(categoriesList)
  }

  return (
    <div className='pt-7 container mx-auto '>
      {currentSelect && <Title title={currentSelect.label} />}

      <div className='p-3 md:p-8 md:bg-gray-300 md:dark:bg-slate-700 rounded-lg text-white mb-14 flex flex-col sm:flex-row justify-between items-center'>
        <div className='w-full lg:w-[300px]'>
          {currentSelect && (
            <Select
              options={UniqueList}
              onChange={onChange}
              defaultValue={currentSelect}
              classNamePrefix='react-select'
            />
          )}
        </div>
        <div className='font-bold mt-4 sm:mt-0 hidden  md:block '>
          <span className='sm:ml-4 text-gray-900 dark:text-white'>
            {filteredPostList.length} {wordForm(filteredPostList.length, ['статья', 'статьи', 'статей'])}
          </span>
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-4'>
          {isLoading ? (
            <>
              <SkeletonCard cl='h-[435px]' />
              <SkeletonCard cl='h-[435px]' />
              <SkeletonCard cl='h-[435px]' />
            </>
          ) : (
            <List
              items={getArrRange(filteredPostList as [], part, page).reverse()}
              renderItem={(post: postListProps) => <PostItem post={post} users={users} key={post.id} />}
            />
          )}
        </div>
      </div>
      <Pagination listLength={filteredPostList.length} part={part} page={page} changePage={changePage} />
    </div>
  )
}
