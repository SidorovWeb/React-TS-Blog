import React, { FC, useEffect } from 'react'
import { IPostListProps } from '../../../types/postsTypes'

interface EditorContentProps {
  post: IPostListProps
  errors: any
  clearErrors: Function
  watch: Function
  setValue: Function
  isModeration: boolean
}

export const EditorContent: FC<EditorContentProps> = ({ post, errors, clearErrors, watch, setValue, isModeration }) => {
  const content = watch('content')

  useEffect(() => {
    if (errors.content) {
      clearErrors('content')
    }
  }, [content])

  return (
    <div className='mb-6'>
      <div
        className={`${
          errors.content ? 'border-red-500' : 'border-transparent'
        } before:text-gray-700 border-2 text-2xl font-bold cursor-text`}
        contentEditable={!isModeration}
        suppressContentEditableWarning
        placeholder='Придумали что написать?'
        onInput={(e) => {
          setValue('content', e.currentTarget.textContent)
        }}
      >
        {post.content}
      </div>
    </div>
  )
}
