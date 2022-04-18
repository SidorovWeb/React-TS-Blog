import { useEffect, useState } from 'react'
import { FC } from 'react'
import { postListProps } from '../types/postsTypes'
import { getArrRange } from '../utils'
import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { SortingPanel } from '../components/SortingPanel/SortingPanel'
import { Pagination } from '../components/Pagination/Pagination'
import { useLocation } from 'react-router-dom'
import { useSelector } from '../hooks/useTypedSelector'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
import { Title } from '../components/Title/Title'

interface UserState {
  slug: string
  name: string
}

export const ArchivesPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const postList = posts.filter((p) => p.status.type === 'published')
  const [filteredPostList, setFilteredPostList] = useState<any>([])
  const [part] = useState(3)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('Все статьи')
  const [valueSelect, setValueSelect] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      const { name } = location.state as UserState
      filter(name)
      return
    }
    filter()
  }, [posts, location])

  const changePage = (page: number) => {
    setPage(page)
  }

  const filter = (val: string = 'all') => {
    if (val === 'all') {
      setFilteredPostList(postList)
      setTitle('Все статьи')
      setValueSelect('all')
      return
    }

    const categoriesList = postList.filter(
      (post) => post.categories.some((cat) => cat.name.toLowerCase() === val.toLowerCase()) && post
    )

    setTitle(val)
    setValueSelect(val)
    setFilteredPostList(categoriesList)
  }

  return (
    <div className='pt-7 container mx-auto '>
      <Title title={title} />
      <SortingPanel
        posts={filteredPostList}
        filter={filter}
        valueSelect={valueSelect}
        setValueSelect={setValueSelect}
      />
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
              renderItem={(post: postListProps) => <PostItem post={post} key={post.id} />}
            />
          )}
        </div>
      </div>
      <Pagination listLength={filteredPostList.length} part={part} page={page} changePage={changePage} />
    </div>
  )
}
