import { FC } from 'react'
import { postListProps } from '../../../types/postsTypes'
import { User } from '../../../types/userTypes'
import { EditorSidebarAdmin } from './EditorSidebarAdmin'
import { EditorSidebarUser } from './EditorSidebarUser'

interface EditorSidebarProps {
  post: postListProps
  user: User
  isModeration: boolean
}

export const EditorSidebar: FC<EditorSidebarProps> = ({ user, post, isModeration }) => {
  return !isModeration ? <EditorSidebarUser post={post} /> : <EditorSidebarAdmin currentUser={user} post={post} />
}
