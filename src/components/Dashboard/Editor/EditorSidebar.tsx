import React, { FC } from 'react'
import { IPostListProps } from '../../../types/postsTypes'
import { EditorSidebarAdmin } from './EditorSidebarAdmin'
import { EditorSidebarUser } from './EditorSidebarUser'

interface EditorSidebarProps {
  post: IPostListProps
  isModeration: boolean
}

export const EditorSidebar: FC<EditorSidebarProps> = ({ post, isModeration }) => {
  return !isModeration ? <EditorSidebarUser post={post} /> : <EditorSidebarAdmin post={post} />
}
