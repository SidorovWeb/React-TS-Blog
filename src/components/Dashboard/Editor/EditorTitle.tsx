import React, { FC, useEffect } from 'react'
import { postListProps } from '../../../types/postsTypes'

interface EditorTitleProps {
  post: postListProps
  errors: any
  setValue: Function
  clearErrors: Function
  watch: Function
  isModeration: boolean
}

export const EditorTitle: FC<EditorTitleProps> = ({ post, errors, clearErrors, watch, setValue, isModeration }) => {
  const title = watch('title')

  useEffect(() => {
    if (errors.title) {
      clearErrors('title')
    }
  }, [title])

  return (
    <div className='mb-12 text-gray-900'>
      <div
        className={`${
          errors.title ? 'border-red-500' : 'border-transparent'
        } font-bold text-xl md:text-4xl before:text-gray-700 border-2 cursor-text`}
        contentEditable={!isModeration}
        placeholder='Как будет называться статья?'
        suppressContentEditableWarning
        onInput={(e) => {
          setValue('title', e.currentTarget.textContent)
        }}
      >
        {post.title}
      </div>
    </div>
  )
}
