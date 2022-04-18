import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActions } from '../../../../hooks/useActions'
import { useSelector } from '../../../../hooks/useTypedSelector'
import { postListProps } from '../../../../types/postsTypes'
import { User } from '../../../../types/userTypes'
import { formatTimestamp, ucFirst } from '../../../../utils'
import { EditorContent } from './EditorContent'
import { EditorExcerpt } from './EditorExcerpt'
import { EditorLoader } from './EditorLoader'
import { EditorPreviewImage } from './EditorPreviewImage'
import { EditorTags } from './EditorTags'
import { EditorTitle } from './EditorTitle'

interface EditorMainProps {
  user: User
  post: postListProps
}

export const EditorMain: FC<EditorMainProps> = ({ user, post }) => {
  const { storage, storageDelete, postUpdate, postCreate } = useActions()
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
    const titleText = data.title ? data.title.trim().replace(/\s{2,}/g, ' ') : data.title
    const contentText = data.content ? data.content.trim().replace(/\s{2,}/g, ' ') : data.content
    const excerptText = data.excerpt ? data.excerpt.trim().replace(/\s{2,}/g, ' ') : data.excerpt

    if (!titleText || (titleText && titleText.length < 1)) {
      setError('title', { type: 'Error' })
      toast.error('Поле не должно быть пустым')
      return
    }

    if (postStatus.type === 'pending' && excerptText.length < 1) {
      setError('excerpt', { type: 'Error' })
      toast.error('Поле не должно быть пустым')
      return
    }

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
      const url = await new Promise((resolve) => resolve(storage(file, fileLocated)))
      urlPrevImg = String(url)
    }

    if (post.previewImage.url && !data.previewImage.url) {
      await new Promise((resolve) => resolve(storageDelete(post.previewImage.fileLocated)))
    }

    let slug = cyrillicToTranslit.transform(titleText, '_').toLocaleLowerCase()
    slug = slug.endsWith('?') ? slug.slice(0, -1) : slug

    let categories =
      data.categories.length > 0 ? data.categories : [{ name: 'Web Development', slug: 'web_development' }]

    const newPost: postListProps = {
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
      categories: categories,
      timestamp: post.timestamp === '' ? serverTimestamp() : post.timestamp,
    }

    if (post.id) {
      postUpdate(newPost)
    } else {
      const postID = await new Promise((resolve) => resolve(postCreate(newPost)))
      navigate(`/my-account/editor/${postID}`)
    }

    toast.success(postStatus.message)
    setIsLoadingPost(false)
  }

  return (
    <>
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
          <div className='text-md font-bold mb-10 flex justify-between text-gray-900'>
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
