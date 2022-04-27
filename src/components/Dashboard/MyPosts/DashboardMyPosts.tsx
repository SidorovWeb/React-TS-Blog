import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useActions } from '../../../hooks/useActions'
import { useModal } from '../../../hooks/useModal'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { MyButton } from '../../UI/MyButton/MyButton'
import { DashboardContainerContent } from '../DashboardContainerContent'
import { DashboardPost } from '../DashboardPost'
import Select from 'react-select'

export const DashboardMyPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const postList = posts.filter((post) => post.uid === user.id)
  const [currentPost, setCurrentPost] = useState<any>()
  const [filteredPostList, setFilteredPostList] = useState<any>([])
  const { hide, show, Modal } = useModal()
  const { storageDelete, postDelete } = useActions()

  const options = [
    { value: 'all', label: 'Все статьи' },
    { value: 'published', label: 'Published' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' },
    { value: 'draft', label: 'Draft' },
  ]

  useEffect(() => {
    onChange(options[0])
  }, [posts])

  const deleteOnClick = (post: postListProps) => {
    show()
    setCurrentPost(post)
  }

  const deleteCurrentPost = async () => {
    if (currentPost) {
      if (currentPost.previewImage.url) {
        await new Promise((resolve) => resolve(storageDelete(currentPost.previewImage.fileLocated)))
      }
      postDelete(currentPost)
      hide()
      toast.success('Пост удален!')
      setCurrentPost({})
    }
  }

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
      <>
        <div className='mr-4 text-xl font-bold mb-6'>Мои посты</div>
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
        <div className='rounded-lg'>
          {!filteredPostList.length && <p className='font-bold text-2xl mt-10'>Список постов пуст</p>}
          {!isLoading && (
            <List
              items={filteredPostList.reverse()}
              renderItem={(post: postListProps) => (
                <DashboardPost post={post} key={post.id} uid={user.id} myPosts={true} deleteOnClick={deleteOnClick} />
              )}
            />
          )}
        </div>
        <Modal>
          <div className='text-center'>
            <div className='font-bold text-xl mb-6'>Удалить пост?</div>
            <MyButton
              className='btn py-2  !bg-red-600 text-sm lg:text-base'
              onClick={() => {
                deleteCurrentPost()
              }}
            >
              Удалить
            </MyButton>
            <MyButton
              className='btn py-2 ml-2 md:ml-4 text-sm lg:text-base'
              onClick={() => {
                hide()
                setCurrentPost({})
              }}
            >
              Отменить
            </MyButton>
          </div>
        </Modal>
      </>
    </DashboardContainerContent>
  )
}
