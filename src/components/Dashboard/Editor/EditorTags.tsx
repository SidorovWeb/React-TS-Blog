import { HashtagIcon } from '@heroicons/react/outline'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IPostListProps } from '../../../types/postsTypes'

interface EditorTagsProps {
  post: IPostListProps
  errors: any
  setError: Function
  setValue: Function
  clearErrors: Function
  isModeration: boolean
}

export const EditorTags: FC<EditorTagsProps> = ({ post, errors, setError, clearErrors, setValue, isModeration }) => {
  const [categories, setCategories] = useState<any[]>([])
  const [inputTags, setInputTags] = useState('')

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
    setCategories((old) => [...old, inputTags])
    setInputTags('')
  }

  const onDeleteCat = (tag: number) => {
    setCategories(categories.filter((item, idx) => idx !== tag))
  }

  return (
    <div className='flex-grow-0 font-bold flex flex-col'>
      <label className='mb-2 block text-lg' htmlFor='tags'>
        Теги
      </label>
      <div className='flex'>
        <div className='flex items-center'>
          {categories.map((tag, idx) => (
            <div
              className={`${
                !isModeration && 'hover:cursor-pointer hover:line-through'
              } mr-4 px-4 h-12 bg-pink-500 text-white font-bold rounded-lg  hover flex items-center`}
              onClick={() => {
                if (!isModeration) onDeleteCat(idx)
              }}
              key={idx}
            >
              {tag}
            </div>
          ))}
        </div>
        {!isModeration && (
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
        )}
      </div>
    </div>
  )
}
