import { HashtagIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { postListProps } from '../../../../types/postsTypes'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

interface EditorTagsProps {
  post: postListProps
  errors: any
  setError: Function
  setValue: Function
  clearErrors: Function
  isModeration: boolean
}

export const EditorTags: FC<EditorTagsProps> = ({ post, errors, setError, clearErrors, setValue, isModeration }) => {
  const [categories, setCategories] = useState<any[]>([])
  const [inputTags, setInputTags] = useState('')
  const cyrillicToTranslit = new CyrillicToTranslit()

  useEffect(() => {
    setCategories([...post.categories])
  }, [post])

  useEffect(() => {
    if (errors.tags) {
      clearErrors('tags')
    }
  }, [inputTags])

  useEffect(() => {
    setValue('categories', categories)
  }, [categories])

  const onChange = (val: string) => {
    setInputTags(val)
  }

  const onAddingCat = () => {
    if (inputTags.length < 2) {
      setError('tags', { type: 'Error' })
      toast.error('Поле не должно быть пустым и меньше 2 символов')
      return
    }
    let slug = cyrillicToTranslit.transform(inputTags, '_').toLocaleLowerCase()
    setCategories((old) => [...old, { name: inputTags, slug: slug }])
    setInputTags('')
  }

  const onDeleteCat = (idxTag: number) => {
    setCategories(categories.filter((item, idx) => idx !== idxTag))
  }

  return (
    <div className='flex-grow-0 font-bold flex flex-col'>
      <div className='flex flex-wrap mr-2 w-full mb-2'>
        {categories.map((tag, idx) => (
          <div
            className={`${
              !isModeration && 'mr-2 mb-2 hover:cursor-pointer hover:line-through'
            } mr-2 mb-2 py-3 px-4 text-xs  bg-pink-500 text-white font-bold rounded-lg  hover shadow-lg`}
            onClick={() => {
              if (!isModeration) onDeleteCat(idx)
            }}
            key={idx}
          >
            {tag.name}
          </div>
        ))}
      </div>
      {!isModeration && (
        <div
          className={`${
            errors.tags ? 'border-red-500' : 'border-transparent'
          } flex md:w-80 md:shrink-0  border-2 h-[50px]`}
        >
          <input
            className='bg-gray-300 w-full text-sm md:text-xl py-2 px-4 rounded-tl-lg rounded-bl-lg transition-all font-bold outline-none  text-gray-900'
            type='text'
            id='tags'
            name='tags'
            value={inputTags}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Добавить метку'
          />
          <button className='px-4 !rounded-tl-none !rounded-bl-none btn' type='button' onClick={() => onAddingCat()}>
            <HashtagIcon className='w-[20px] md:w-[30px] h-[48px]' />
          </button>
        </div>
      )}
    </div>
  )
}
