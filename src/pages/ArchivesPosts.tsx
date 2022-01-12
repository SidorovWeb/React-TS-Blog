import { useEffect, useState } from 'react'
import { FC } from 'react'
import { IPostListProps } from '../types/posts'
import { getArrRange, myPostList } from '../utils'
import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { SortingPanel } from '../components/SortingPanel/SortingPanel'
import { Pagination } from '../components/Pagination/Pagination'
import { useLocation } from 'react-router-dom'

interface UserState {
  slug: string
  name: string
}

export const ArchivesPosts: FC = () => {
  const [postList, setPostList] = useState<IPostListProps[]>(myPostList)
  const [filteredPostList, setFilteredPostList] = useState(postList)
  const [part, setPart] = useState(3)
  const [page, setPage] = useState(1)
  const [title, setTitle] = useState('Все статьи')
  const [valueSelect, setValueSelect] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (location.state as UserState) {
      const { name } = location.state as UserState
      setTitle(name)
      filter(name)
      setValueSelect(name)
    }
  }, [location])

  const changePage = (page: number) => {
    setPage(page)
  }

  const filter = (val: string) => {
    if (val === 'all') {
      setFilteredPostList(postList)
      setTitle('Все статьи')
      return
    }

    const categoriesList = postList.filter(
      (post) => post.categories.some((cat) => cat.name.toLowerCase() === val.toLowerCase()) && post
    )
    setTitle(val)
    setFilteredPostList(categoriesList)
  }

  return (
    <>
      <div className='text-5xl font-bold text-white pt-3 pb-12 '>{title}</div>
      <SortingPanel
        posts={filteredPostList}
        filter={filter}
        valueSelect={valueSelect}
        setValueSelect={setValueSelect}
      />
      <div>
        <div className='grid grid-cols-3 gap-5'>
          <List
            items={getArrRange(filteredPostList as [], part, page).reverse()}
            renderItem={(post: IPostListProps) => <PostItem post={post} key={post.id} />}
          />
        </div>
      </div>
      <Pagination listLength={filteredPostList.length} part={part} page={page} changePage={changePage} />
    </>
  )
}
