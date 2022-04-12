import { FC } from 'react'
import { useSelector } from '../../hooks/useTypedSelector'
import { IPostListProps } from '../../types/postsTypes'
import { uniqueListCategories, wordForm } from '../../utils'
import { MySelect } from '../UI/MySelect/MySelect'

interface SortingPanelProps {
  posts: IPostListProps[]
  valueSelect: string
  filter: (val: string) => void
  setValueSelect: (val: string) => void
}

export const SortingPanel: FC<SortingPanelProps> = ({ posts, filter, valueSelect, setValueSelect }) => {
  const postList = useSelector((state) => state.post.posts.filter((p) => p.status.type === 'published'))
  const UniqueList = uniqueListCategories(postList as [], 'name')
  const changeHandler = (val: string) => {
    setValueSelect(val)
    return filter(val)
  }

  return (
    <div className='p-3 md:p-8 bg-black bg-opacity-25 rounded-lg text-white mb-14 flex flex-col sm:flex-row justify-between items-center'>
      <MySelect options={UniqueList} defaultValue={'Все теги'} value={valueSelect} onChange={changeHandler} />
      <div className='font-bold mt-4 sm:mt-0 '>
        <span className='sm:ml-4'>
          {posts.length} {wordForm(posts.length, ['статья', 'статьи', 'статей'])}
        </span>
      </div>
    </div>
  )
}
