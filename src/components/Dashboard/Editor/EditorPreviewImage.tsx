import { PhotographIcon, TrashIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { postListProps } from '../../../types/postsTypes'
import { MyButton } from '../../UI/MyButton/MyButton'

interface EditorPreviewImageProps {
  post: postListProps
  register: any
  isModeration: boolean
  setValue: Function
}

export const EditorPreviewImage: FC<EditorPreviewImageProps> = ({ post, register, setValue, isModeration }) => {
  const [urlPreviewImage, setUrlPreviewImage] = useState<any>()

  useEffect(() => {
    if (post.previewImage) {
      setUrlPreviewImage(post.previewImage.url)
    }
  }, [post])

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

  const onDeleteImage = async () => {
    setUrlPreviewImage('')
    setValue('previewImage', { url: '', fileLocated: '' })
  }

  return (
    <div className='mb-10'>
      {urlPreviewImage ? (
        <div className='rounded-lg overflow-hidden relative shadow-lg'>
          <img className='w-full object-cover h-full max-h-80' src={urlPreviewImage} alt={post.title} loading='lazy' />
          {!isModeration && (
            <MyButton className='btn py-2 absolute top-2 right-2' type='button' onClick={() => onDeleteImage()}>
              <TrashIcon width={26} />
            </MyButton>
          )}
        </div>
      ) : (
        <div className='text-center text-md md:text-xl font-bold mb-4'>
          <input
            className='hidden opacity-0 w-0'
            type='file'
            accept='image/*'
            id='imageInput'
            {...register('previewImage')}
            onChange={(e) => onChangeFile(e)}
          />
          <label
            className={`${
              isModeration && 'opacity-60 pointer-events-none'
            } p-2 cursor-pointer inline-flex items-center  rounded-lg btn py-4 !px-4`}
            htmlFor='imageInput'
          >
            <PhotographIcon width={26} /> <p className='ml-1'>Добавить обложку</p>
          </label>
        </div>
      )}
    </div>
  )
}
