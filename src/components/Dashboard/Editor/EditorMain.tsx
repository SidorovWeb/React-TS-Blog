import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postCreate, postUpdate } from '../../../store/action-creators/postAction'
import { storage, storageDelete } from '../../../store/action-creators/storageAction'
import { IPostListProps } from '../../../types/postsTypes'
import { User } from '../../../types/userTypes'
import { formatTimestamp, statusColor, ucFirst } from '../../../utils'
import { EditorContent } from './EditorContent'
import { EditorExcerpt } from './EditorExcerpt'
import { EditorLoader } from './EditorLoader'
import { EditorPreviewImage } from './EditorPreviewImage'
import { EditorTags } from './EditorTags'
import { EditorTitle } from './EditorTitle'

interface EditorMainProps {
  user: User
  post: IPostListProps
}

export const EditorMain: FC<EditorMainProps> = ({ user, post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isModeration = location.search.includes('moderation')
  const postStatus = useSelector((state) => state.post.postStatus)
  const refSubmitButton = useRef<HTMLButtonElement>(null)
  const cyrillicToTranslit = new CyrillicToTranslit()
  const [isLoadingPost, setIsLoadingPost] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    clearErrors,
  } = useForm()

  useEffect(() => {
    reset(post)
  }, [post])

  useEffect(() => {
    if (postStatus.type !== '') {
      refSubmitButton.current?.click()
    }
  }, [postStatus])

  const onSaveUpdatingPost = async (data: any) => {
    // TODO: Как сократить
    const titleText = data.title ? data.title.trim().replace(/\s{2,}/g, ' ') : data.title
    const contentText = data.content ? data.content.trim().replace(/\s{2,}/g, ' ') : data.content
    const excerptText = data.excerpt ? data.excerpt.trim().replace(/\s{2,}/g, ' ') : data.excerpt
    // TODO: Как сократить
    if (!titleText || (titleText && titleText.length < 1)) {
      setError('title', { type: 'Error' })
      toast.error('Поле не должно быть пустым')
      return
    }
    // TODO: Как сократить
    if (postStatus.type === 'pending' && excerptText.length < 1) {
      setError('excerpt', { type: 'Error' })
      toast.error('Поле не должно быть пустым')
      return
    }

    // TODO: Как сократить
    if (postStatus.type === 'pending' && contentText.length < 1) {
      setError('content', { type: 'Error' })
      toast.error('Поле не должно быть пустым')
      return
    }

    setIsLoadingPost(true)

    const file = data.previewImage
    let urlPrevImg = data.previewImage.url
    let fileLocated = data.previewImage.fileLocated

    if (file instanceof File) {
      fileLocated = `${user.uid}/${Timestamp.now() + file.name}`
      const url = await new Promise((resolve) => resolve(dispatch(storage(file, fileLocated))))
      urlPrevImg = String(url)
    }

    if (post.previewImage.url && !data.previewImage.url) {
      await new Promise((resolve) => resolve(dispatch(storageDelete(post.previewImage.fileLocated))))
    }

    let slug = cyrillicToTranslit.transform(titleText, '_').toLocaleLowerCase()
    slug = slug.endsWith('?') ? slug.slice(0, -1) : slug

    const newPost: IPostListProps = {
      ...post,
      ...data,
      author: user.userName,
      uid: user.id,
      title: ucFirst(titleText),
      slug: slug,
      content: ucFirst(contentText),
      excerpt: ucFirst(excerptText),
      previewImage: {
        url: urlPrevImg,
        fileLocated: fileLocated,
      },
      status: {
        type: postStatus.type,
        message: post.status.message !== '' ? post.status.message : '',
      },
      categories: data.categories,
      timestamp: post.timestamp === '' ? serverTimestamp() : post.timestamp,
    }

    if (post.id) {
      dispatch(postUpdate(newPost))
    } else {
      const postID = await new Promise((resolve) => resolve(dispatch(postCreate(newPost))))
      navigate(`/my-account/editor/${postID}`)
    }

    toast.success(postStatus.message)
    setIsLoadingPost(false)
  }

  return (
    <>
      {post.status.type !== 'draft' && post.status.message && (
        <div
          className='text-white py-2 px-4 font-bold rounded-lg mb-10'
          style={{ backgroundColor: statusColor(post.status.type) }}
        >
          <span>Сообщение от модератора: </span>
          <span className='ml-4'>{post.status.message}</span>
        </div>
      )}

      <form
        className='flex flex-col'
        onSubmit={handleSubmit(onSaveUpdatingPost)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <div className='flex-grow mb-10'>
          <div className='text-md font-bold mb-10 flex justify-between'>
            {post.author && <div>Автор: {post.author}</div>}

            {post.uid && <p>Пост создан: {formatTimestamp(post.timestamp)}</p>}
          </div>
          <EditorTitle
            post={post}
            errors={errors}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            isModeration={isModeration}
          />
          <EditorPreviewImage post={post} register={register} setValue={setValue} isModeration={isModeration} />
          <EditorExcerpt
            post={post}
            errors={errors}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            isModeration={isModeration}
          />
          <EditorContent
            post={post}
            errors={errors}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            isModeration={isModeration}
          />
        </div>
        <EditorTags
          post={post}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
          setValue={setValue}
          isModeration={isModeration}
        />
        <button hidden={true} ref={refSubmitButton} type={'submit'} />
      </form>
      <EditorLoader isLoading={isLoadingPost} />
    </>
  )
}
