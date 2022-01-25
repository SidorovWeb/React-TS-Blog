import { PhotographIcon } from '@heroicons/react/solid'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from '../../../hooks/useTypedSelector'
import { postCreate, postUpdate } from '../../../store/action-creators/postAction'
import { IPostListProps } from '../../../types/posts'
import { User } from '../../../types/user'
import { Fieldset } from '../../UI/Fieldset/Fieldset'
interface EditorContentProps {
  user: User
  post: IPostListProps
}

export const EditorContent: FC<EditorContentProps> = React.memo(({ user, post }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const postStatus = useSelector((state) => state.post.postStatus)
  const [urlPreviewImage, setUrlPreviewImage] = useState<any>('')
  const refSubmitButton = useRef<HTMLButtonElement>(null)
  const cyrillicToTranslit = new CyrillicToTranslit()

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
  }, [post])

  useEffect(() => {
    if (errors.title) {
      clearErrors('title')
    }
  }, [title])

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
    console.log(val)
  }

  const createPost = (data: any) => {
    const value = data.title ? data.title.trim().replace(/\s{2,}/g, ' ') : data.title

    if (!value || (value && value.length < 15)) {
      setError('title', { type: 'Error' })
      toast.error('Заголовок не должен быть пустым и меньше 15 символов!')
      return
    }

    const newPost: IPostListProps = {
      ...post,
      ...data,
      author: user.userName,
      uid: user.id,
      title: value,
      slug: cyrillicToTranslit.transform(value, '_').toLocaleLowerCase(),
      previewImage: data.previewImage.name ?? '',
      status: postStatus.type,
    }

    if (post.id) {
      dispatch(postUpdate(newPost))
    } else {
      const postID = (id: string) => {
        if (!params.id) {
          navigate(`/my-account/editor/${id}`)
        }
      }

      dispatch(postCreate(newPost, postID))
    }

    toast.success(postStatus.message)
  }

  return (
    <form onSubmit={handleSubmit(createPost)}>
      <div className='text-md font-bold mb-10'>Автор: {user.userName}</div>
      <div className='mb-12'>
        <div
          className={`${
            errors.title ? 'border-b-red-500 border-b-4' : 'border-b-transparent'
          } font-bold text-4xl before:text-gray-700 border-b-4 cursor-text`}
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
            <img className='w-full object-cover h-full max-h-80' src={urlPreviewImage} alt={user.userName} />
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
      <div>
        <Fieldset labelText='Теги' id='tags' type='text' value='' onChange={onChange}></Fieldset>
      </div>
      <button hidden={true} ref={refSubmitButton} type={'submit'} />
    </form>
  )
})
