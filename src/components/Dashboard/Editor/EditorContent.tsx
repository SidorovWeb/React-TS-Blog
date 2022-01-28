import { HashtagIcon } from '@heroicons/react/outline'
import { PhotographIcon } from '@heroicons/react/solid'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postCreate, postUpdate } from '../../../store/action-creators/postAction'
import { storage } from '../../../store/action-creators/storageAction'
import { IPostListProps } from '../../../types/postsTypes'
import { User } from '../../../types/userTypes'
interface EditorContentProps {
  user: User
  post: IPostListProps
}

export const EditorContent: FC<EditorContentProps> = React.memo(({ user, post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const postStatus = useSelector((state) => state.post.postStatus)
  const [urlPreviewImage, setUrlPreviewImage] = useState<any>()
  const refSubmitButton = useRef<HTMLButtonElement>(null)
  const cyrillicToTranslit = new CyrillicToTranslit()
  const [inputTags, setInputTags] = useState('')
  const [categories, setCategories] = useState<any[]>([])

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

  const title = watch('title')

  useEffect(() => {
    reset(post)
    setCategories([...post.categories])
    if (post.previewImage) {
      setUrlPreviewImage(post.previewImage)
    }
  }, [post])

  useEffect(() => {
    if (errors.title) {
      clearErrors('title')
    }
    if (errors.tags) {
      clearErrors('tags')
    }
  }, [title, inputTags])

  useEffect(() => {
    if (postStatus.type !== '') {
      refSubmitButton.current?.click()
    }
  }, [postStatus])

  const onChangeFile = (event: any) => {
    const file = event.target.files[0]

    if (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)

      reader.addEventListener('load', function () {
        setUrlPreviewImage(this.result)
        setValue('previewImage', event.target.files[0])
      })
    }
  }

  const onChange = (val: string) => {
    setInputTags(val)
  }

  const onAddingCat = () => {
    if (inputTags.length < 2) {
      setError('tags', { type: 'Error' })
      toast.error('Поле не должно быть пустым и меньше 2 символов')
      return
    }
    setCategories((old) => [...old, inputTags])
    setInputTags('')
  }

  const onDeleteCat = (tag: number) => {
    setCategories(categories.filter((item, idx) => idx !== tag))
  }

  const createPost = async (data: any) => {
    const value = data.title ? data.title.trim().replace(/\s{2,}/g, ' ') : data.title
    if (!value || (value && value.length < 15)) {
      setError('title', { type: 'Error' })
      toast.error('Заголовок не должен быть пустым и меньше 15 символов')
      return
    }

    const file = data.previewImage
    let prevImgName = post.previewImage

    if (file) {
      const url = await new Promise((resolve) => resolve(dispatch(storage(file, user))))
      prevImgName = String(url)
    }

    // TODO: удаление картинки из storage

    const newPost: IPostListProps = {
      ...post,
      ...data,
      author: user.userName,
      uid: user.id,
      title: value,
      slug: cyrillicToTranslit.transform(value, '_').toLocaleLowerCase(),
      previewImage: prevImgName,
      status: postStatus.type,
      categories: categories,
    }

    if (post.id) {
      dispatch(postUpdate(newPost))
    } else {
      const postID = (id: string) => {
        if (!params.id) {
          dispatch(postUpdate({ ...newPost, id: id }))
          navigate(`/my-account/editor/${id}`)
        }
      }

      dispatch(postCreate(newPost, postID))
    }

    toast.success(postStatus.message)
  }

  return (
    <form
      className='flex flex-col h-full'
      onSubmit={handleSubmit(createPost)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }}
    >
      <div className='flex-grow '>
        <div className='text-md font-bold mb-10 flex justify-between'>
          <p>Автор: {user.userName}</p>
          {post.uid && <p>Пост создан: {post.timestamp}</p>}
        </div>
        <div className='mb-12'>
          <div
            className={`${
              errors.title ? 'border-red-500' : 'border-transparent'
            } font-bold text-4xl before:text-gray-700 border-2 cursor-text`}
            contentEditable
            placeholder='Как будет называться статья?'
            suppressContentEditableWarning
            onInput={(e) => {
              setValue('title', e.currentTarget.textContent)
            }}
          >
            {post.title}
          </div>
        </div>
        <div className='mb-10'>
          {urlPreviewImage ? (
            <div className='rounded-lg overflow-hidden'>
              <img className='w-full object-cover h-full max-h-80' src={urlPreviewImage} alt={post.title} />
            </div>
          ) : (
            <div className='text-center text-xl font-bold mb-4'>
              <input
                className='hidden opacity-0 w-0'
                type='file'
                accept='image/*'
                id='imageInput'
                {...register('previewImage')}
                onChange={(e) => onChangeFile(e)}
              />
              <label className=' p-2 cursor-pointer inline-flex items-center  rounded-lg btn py-4' htmlFor='imageInput'>
                <PhotographIcon width={26} /> <p className='ml-1'>Добавить обложку</p>
              </label>
            </div>
          )}
        </div>
        <div className='mb-6'>
          <div
            className='text-2xl font-bold before:text-gray-700 cursor-text'
            contentEditable
            suppressContentEditableWarning
            placeholder='Придумали что написать?'
            onInput={(e) => {
              setValue('content', e.currentTarget.textContent)
            }}
          >
            {post.content}
          </div>
        </div>
      </div>
      <div className='flex-grow-0 font-bold flex flex-col'>
        <label className='mb-2 block text-lg' htmlFor='tags'>
          Теги
        </label>
        <div className='flex'>
          <div className='flex items-center'>
            {categories.map((tag, idx) => (
              <p
                className='mr-4 px-4 h-12 bg-pink-500 text-white font-bold rounded-lg hover:cursor-pointer hover:line-through hover flex items-center'
                onClick={() => onDeleteCat(idx)}
                key={idx}
              >
                {tag}
              </p>
            ))}
          </div>
          <div className={`${errors.tags ? 'border-red-500' : 'border-transparent'} flex w-80 shrink-0  border-2`}>
            <input
              className='bg-gray-300 w-full text-xl py-2 px-4 rounded-tl-lg rounded-bl-lg transition-all font-bold outline-none'
              type='text'
              id='tags'
              name='tags'
              value={inputTags}
              onChange={(e) => onChange(e.target.value)}
              placeholder='Добавить метку'
            />
            <button className='px-4 !rounded-tl-none !rounded-bl-none btn' type='button' onClick={() => onAddingCat()}>
              <HashtagIcon className='' width={30} height={48} />
            </button>
          </div>
        </div>
      </div>
      <button hidden={true} ref={refSubmitButton} type={'submit'} />
    </form>
  )
})
