import { doc, updateDoc } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../../firebase'
import { useActions } from '../../../hooks/useActions'
import { useModal } from '../../../hooks/useModal'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postListProps } from '../../../types/postsTypes'
import { User, userType } from '../../../types/userTypes'
import { statusColor } from '../../../utils'
import { MyButton } from '../../UI/MyButton/MyButton'
import { EditorLoader } from './EditorLoader'

interface EditorSidebarAdminProps {
  post: postListProps
  currentUser: User
}

export const EditorSidebarAdmin: FC<EditorSidebarAdminProps> = ({ currentUser, post }) => {
  const dispatch = useDispatch()
  const { usersUpdate, postUpdate } = useActions()
  const navigate = useNavigate()
  const users = useSelector((state) => state.user.users)
  const [publish, setPublish] = useState(false)
  const [postUser, setPostUser] = useState<any>()
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const { hide, show, Modal } = useModal()

  useEffect(() => {
    if (users.length) {
      const user = users.filter((u: User) => u.id === post.uid)
      setPostUser(user[0])
    }
  }, [users.length])

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm()

  const onSubmit = async (data: { message: string }) => {
    setIsLoadingPost(true)

    hide()

    const message = data.message ? data.message : publish ? 'Статья опубликована' : 'Статья отклонена'
    const notification = [...postUser.notification]

    notification.push({
      postName: post.title,
      postId: post.id,
      postStatus: publish ? 'published' : 'rejected',
      message: message,
      id: notification.length + 1,
    })

    const newUser: User = {
      ...postUser,
      notification: notification,
    }

    await updateDoc(doc(db, 'users', newUser.id), {
      ...newUser,
    })

    if (currentUser.id === post.uid) {
      // TODO: ????
      dispatch({ type: userType.USER_UPDATE_SUCCESS, payload: newUser })
    }

    usersUpdate(newUser)

    const newPost: postListProps = {
      ...post,
      status: {
        type: publish ? 'published' : 'rejected',
        message: message,
      },
    }

    await new Promise((resolve) => resolve(postUpdate(newPost)))

    toast.success(publish ? 'Статья опубликована' : 'Статья отклонена')
    setIsLoadingPost(false)

    reset()
    navigate(-1)
  }

  return (
    <>
      <div className='mb-4 flex flex-col md:flex-row xl:flex-col items-center justify-center'>
        <MyButton
          className={`${
            post.status.type === 'published' && 'opacity-60 pointer-events-none'
          } btn p-4 w-full mb-4 !bg-green-600 mr-0 md:mr-4 xl:mr-0`}
          onClick={() => {
            setPublish(true)
            show()
          }}
        >
          Опубликовать
        </MyButton>
        <MyButton
          className={`${
            post.status.type === 'rejected' && 'opacity-60 pointer-events-none'
          } btn p-4 w-full mb-4 !bg-sky-600`}
          onClick={() => {
            setPublish(false)
            show()
          }}
        >
          Вернуть
        </MyButton>
      </div>
      <div className='text-gray-900'>
        Статья:{' '}
        <span className='' style={{ color: statusColor(post.status.type) }}>
          {post.status.type !== '' ? post.status.type : 'черновик'}
        </span>
      </div>

      <Modal>
        <div className='text-center'>
          <div className='font-bold text-2xl mb-10'>{!publish ? 'Вернуть на доработку?' : 'Опубликовать пост?'}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`${
                errors.message ? 'border-red-500' : 'border-transparent'
              } font-bold text-lg before:text-gray-700 border border-gray-700 cursor-text rounded-lg p-4 mb-10 text-left bg-gray-100 text-gray-700`}
              style={{ minHeight: '120px' }}
              contentEditable
              placeholder={`${publish ? 'Можно что-то написать' : 'Почему возвращается?'}`}
              suppressContentEditableWarning
              onInput={(e) => {
                setValue('message', e.currentTarget.textContent)
              }}
            ></div>
            <MyButton className={`${!publish ? '!bg-sky-600' : '!bg-green-600'} btn py-2 `} type='submit'>
              {!publish ? 'Вернуть' : 'Опубликовать'}{' '}
            </MyButton>
            <MyButton
              type='button'
              className='btn py-2 ml-4'
              onClick={() => {
                hide()
              }}
            >
              Отменить
            </MyButton>
          </form>
        </div>
      </Modal>
      <EditorLoader isLoading={isLoadingPost} />
    </>
  )
}
