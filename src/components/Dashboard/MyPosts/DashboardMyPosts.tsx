import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useModal } from '../../../hooks/useModal'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postDelete } from '../../../store/action-creators/postAction'
import { storageDelete } from '../../../store/action-creators/storageAction'
import { IPostListProps } from '../../../types/postsTypes'
import List from '../../List/List'
import { MyButton } from '../../UI/MyButton/MyButton'
import { DashboardContainerContent } from '../DashboardContainerContent'
import { DashboardPost } from '../DashboardPost'

export const DashboardMyPosts: FC = () => {
  const { posts, isLoading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.user)
  const [currentPost, setCurrentPost] = useState<any>()
  const userPosts = posts.filter((post) => post.uid === user.id)
  const dispatch = useDispatch()
  const { hide, show, Modal } = useModal()

  const deleteOnClick = (post: IPostListProps) => {
    show()
    setCurrentPost(post)
  }

  const deleteCurrentPost = async () => {
    if (currentPost) {
      if (currentPost.previewImage.url) {
        await new Promise((resolve) => resolve(dispatch(storageDelete(currentPost.previewImage.fileLocated))))
      }
      dispatch(postDelete(currentPost))
      hide()
      toast.success('Пост удален!')
      setCurrentPost({})
    }
  }

  return (
    <DashboardContainerContent>
      <>
        <div className='flex justify-between mb-6 font-bold text-black'>
          <span className='mr-4 text-xl'>Мои посты</span>
          <span>постов: {userPosts.length}</span>
        </div>
        <div className='rounded-lg'>
          {!userPosts.length && <p className='font-bold text-2xl mt-10 text-black'>Список постов пуст</p>}
          {!isLoading && (
            <List
              items={userPosts.reverse()}
              renderItem={(post: IPostListProps) => (
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
