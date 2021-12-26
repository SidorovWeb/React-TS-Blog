import React, { FC } from 'react'
import { IPostListProps } from '../../types/types'
import { PostItem } from './PostListItem'

interface PostListProps {
  posts: IPostListProps[]
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
