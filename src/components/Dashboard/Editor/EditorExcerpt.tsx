import { FC, useEffect } from 'react'
import { postListProps } from '../../../types/postsTypes'

interface EditorExcerptProps {
  post: postListProps
  errors: any
  clearErrors: Function
  watch: Function
  setValue: Function
  isModeration: boolean
}

export const EditorExcerpt: FC<EditorExcerptProps> = ({ post, errors, clearErrors, watch, setValue, isModeration }) => {
  const excerpt = watch('excerpt')

  useEffect(() => {
    if (errors.excerpt) {
      clearErrors('excerpt')
    }
  }, [excerpt])

  return (
    <div className='mb-6 text-black'>
      <div
        className={`${
          errors.excerpt ? 'border-red-500' : 'border-transparent'
        } before:text-gray-700 border-2 text-xl md:text-2xl font-bold cursor-text`}
        contentEditable={!isModeration}
        suppressContentEditableWarning
        placeholder='Короткое описание'
        onInput={(e) => {
          setValue('excerpt', e.currentTarget.textContent)
        }}
      >
        {post.excerpt}
      </div>
    </div>
  )
}
