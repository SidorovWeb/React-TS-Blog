// import { HashtagIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { postListProps } from '../../../types/postsTypes'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import Select from 'react-select'

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
  const cyrillicToTranslit = new CyrillicToTranslit()
  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'ajax', label: 'Ajax' },
    { value: 'bootstrap', label: 'Bootstrap' },
    { value: 'tailwindcss', label: 'Tailwind CSS' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'es6', label: 'ES6' },
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'Vue.JS' },
    { value: 'angularjs', label: 'AngularJS' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'php', label: 'PHP' },
    { value: 'node.js', label: 'Node.js' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'firebase', label: 'FireBase' },
    { value: 'json', label: 'JSON' },
    { value: 'svg', label: 'SVG' },
    { value: 'canvas', label: 'Canvas' },
    { value: 'api', label: 'API' },
  ]

  useEffect(() => {
    setCategories([...post.categories])
  }, [post])

  useEffect(() => {
    setValue('categories', categories)
  }, [categories])

  const onChange = (newValue: any) => {
    if (newValue && newValue.value.length < 2) {
      setError('tags', { type: 'Error' })

      return
    }

    let inputValueTransform = cyrillicToTranslit.transform(newValue.value, '_').toLocaleLowerCase()
    setCategories((old) => [...old, { value: inputValueTransform, label: newValue.label }])
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
            } mr-2 mb-2 py-3 px-4 text-xs  bg-slate-600 text-white font-bold rounded-lg  hover:opacity-60 transition-opacity  shadow-lg`}
            onClick={() => {
              if (!isModeration) onDeleteCat(idx)
            }}
            key={idx}
          >
            {tag.value}
          </div>
        ))}
      </div>
      {!isModeration && (
        <div className='w-full md:w-[300px]'>
          <Select
            menuPlacement='top'
            maxMenuHeight={150}
            options={options}
            onChange={onChange}
            classNamePrefix='react-select'
            placeholder='Введите текст '
          />
        </div>
      )}
    </div>
  )
}
