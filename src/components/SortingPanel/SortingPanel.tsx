import { FC, useState } from 'react'
import { IPostListProps } from '../../types/posts'
import { myPostList, uniqueListCategories, wordForm } from '../../utils'
import { MySelect } from '../UI/MySelect/MySelect'

interface SortingPanelProps {
  posts: IPostListProps[]
  valueSelect: string
  filter: (val: string) => void
  setValueSelect: (val: string) => void
}

export const SortingPanel: FC<SortingPanelProps> = ({ posts, filter, valueSelect, setValueSelect }) => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])
  const UniqueList = uniqueListCategories(postList as [], 'name')

  const changeHandler = (val: string) => {
    setValueSelect(val)

    return filter(val)
  }

  return (
    <div className='p-8 bg-black bg-opacity-25 rounded-lg bg- text-white mb-14 flex justify-between items-center'>
      <MySelect options={UniqueList} defaultValue={'Все теги'} value={valueSelect} onChange={changeHandler} />
      <div className='font-bold'>
        <span className='ml-4'>
          {posts.length} {wordForm(posts.length, ['статья', 'статьи', 'статей'])}
        </span>
        {/* <span className='ml-4'>|</span>
        <span className='ml-4'>Sorting</span> */}
      </div>
    </div>
  )
}
