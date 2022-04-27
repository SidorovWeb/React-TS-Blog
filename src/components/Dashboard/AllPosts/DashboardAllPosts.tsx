import { FC, useEffect, useState } from 'react'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { DashboardContainerContent } from '../DashboardContainerContent'
import { DashboardPost } from '../DashboardPost'
import Select from 'react-select'

export const DashboardAllPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const postList = posts.filter((post) => post.status.type !== 'draft')
  postList.sort((a, b) => (a.status.type < b.status.type ? 1 : -1))
  const [filteredPostList, setFilteredPostList] = useState<any>([])

  const options = [
    { value: 'all', label: 'Все статьи' },
    { value: 'pending', label: 'Pending' },
    { value: 'published', label: 'Published' },
    { value: 'rejected', label: 'Rejected' },
  ]

  useEffect(() => {
    onChange(options[0])
  }, [posts])

  const onChange = (newValue: any) => {
    if (newValue.value === 'all') {
      setFilteredPostList(postList)
      return
    }

    const categoriesList = postList.filter((post) => post.status.type.toLowerCase() === newValue.value.toLowerCase())
    setFilteredPostList(categoriesList)
  }

  return (
    <DashboardContainerContent>
      <div className='mr-4 text-xl font-bold mb-6'>Модерация постов</div>
      <div className='flex justify-between mb-6'>
        <div className='w-full md:w-[300px]'>
          <Select
            isSearchable={false}
            options={options}
            defaultValue={options[0]}
            onChange={onChange}
            classNamePrefix='react-select'
            placeholder='Введите текст '
          />
        </div>
        <span className='font-bold hidden md:block'>постов: {filteredPostList.length}</span>
      </div>
      <div className='rounded-lg '>
        {!filteredPostList.length && <p className='font-bold text-2xl mt-10 '>Список постов пуст</p>}
        {!isLoading && (
          <List
            items={filteredPostList.reverse()}
            renderItem={(post: postListProps) => <DashboardPost post={post} key={post.id} />}
          />
        )}
      </div>
    </DashboardContainerContent>
  )
}
