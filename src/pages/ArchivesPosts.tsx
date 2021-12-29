import { useEffect, useState } from 'react'
import { FC } from 'react'
import { IPostListProps } from '../types/types'
import { getArrRange, myPostList } from '../utils'
import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { SortingPanel } from '../components/SortingPanel/SortingPanel'
import { Pagination } from '../components/Pagination/Pagination'

export const ArchivesPosts: FC = () => {
  const [postList, setPostList] = useState<IPostListProps[]>(myPostList)
  const [filteredPostList, setFilteredPostList] = useState(postList)
  const [part, setPart] = useState(3)
  const [page, setPage] = useState(1)

  const changePage = (page: number) => {
    setPage(page)
  }

  const filter = (val: string) => {
    if (val === 'all') {
      setFilteredPostList(postList)
      return
    }

    const categoriesList = postList.filter(
      (post) => post.categories.some((cat) => cat.name.toLowerCase() === val.toLowerCase()) && post
    )

    setFilteredPostList(categoriesList)
  }

  return (
    <>
      <div className='text-5xl font-bold text-white pt-3 pb-12 '>Все статьи</div>
      <SortingPanel posts={filteredPostList} filter={filter} />
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
