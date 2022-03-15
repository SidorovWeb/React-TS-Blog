import { doc, updateDoc } from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../../firebase'
import { useSelector } from '../../../hooks/useTypedSelector'
import { modal } from '../../../store/action-creators/modalAction'
import { postUpdate } from '../../../store/action-creators/postAction'
import { usersUpdate } from '../../../store/action-creators/userAction'
import { IPostListProps } from '../../../types/postsTypes'
import { User, userType } from '../../../types/userTypes'
import { statusColor } from '../../../utils'
import { Modal } from '../../UI/Modal/Modal'
import { MyButton } from '../../UI/MyButton/MyButton'
import { EditorLoader } from './EditorLoader'

interface EditorSidebarAdminProps {
  post: IPostListProps
  currentUser: User
}

export const EditorSidebarAdmin: FC<EditorSidebarAdminProps> = ({ currentUser, post }) => {
  const users = useSelector((state) => state.user.users)
  const open = useSelector((state) => state.modal.open)
  const [publish, setPublish] = useState(false)
  const [postUser, setPostUser] = useState<any>()
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      dispatch({ type: userType.USER_UPDATE_SUCCESS, payload: newUser })
    }

    dispatch(usersUpdate(newUser))

    const newPost: IPostListProps = {
      ...post,
      status: {
        type: publish ? 'published' : 'rejected',
        message: message,
      },
    }

    await new Promise((resolve) => resolve(dispatch(postUpdate(newPost))))

    toast.success(publish ? 'Статья опубликована' : 'Статья отклонена')
    dispatch(modal(false))
    setIsLoadingPost(false)
    reset()
    navigate(-1)
  }

  return (
    <>
      <div className='mb-4'>
        <MyButton
          className={`${
            post.status.type === 'published' && 'opacity-60 pointer-events-none'
          } btn p-4 w-full mb-4 !bg-green-600`}
          onClick={() => {
            setPublish(true)
            dispatch(modal(true))
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
            dispatch(modal(true))
          }}
        >
          Вернуть
        </MyButton>
      </div>
      <div>
        Статья:{' '}
        <span className='' style={{ color: statusColor(post.status.type) }}>
          {post.status.type !== '' ? post.status.type : 'черновик'}
        </span>
      </div>
      <Modal open={open}>
        <div className='text-center'>
          <div className='font-bold text-2xl mb-10'>{!publish ? 'Вернуть на доработку?' : 'Опубликовать пост?'}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`${
                errors.message ? 'border-red-500' : 'border-transparent'
              } font-bold text-lg before:text-gray-700 border border-gray-700 cursor-text rounded-lg p-4 mb-10 text-left`}
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
            <MyButton className='btn py-2 ml-4' onClick={() => dispatch(modal(false))}>
              Отменить
            </MyButton>
          </form>
        </div>
      </Modal>
      <EditorLoader isLoading={isLoadingPost} />
    </>
  )
}
