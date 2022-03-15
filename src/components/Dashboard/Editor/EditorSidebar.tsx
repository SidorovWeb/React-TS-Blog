import React, { FC } from 'react'
import { IPostListProps } from '../../../types/postsTypes'
import { User } from '../../../types/userTypes'
import { EditorSidebarAdmin } from './EditorSidebarAdmin'
import { EditorSidebarUser } from './EditorSidebarUser'

interface EditorSidebarProps {
  post: IPostListProps
  user: User
  isModeration: boolean
}

export const EditorSidebar: FC<EditorSidebarProps> = ({ user, post, isModeration }) => {
  return !isModeration ? <EditorSidebarUser post={post} /> : <EditorSidebarAdmin currentUser={user} post={post} />
}
