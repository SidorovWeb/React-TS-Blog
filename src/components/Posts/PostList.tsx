import { FC } from 'react'
import { postListProps } from '../../types/postsTypes'
import { PostItem } from './PostListItem'

interface PostListProps {
  posts: postListProps[]
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  )
}
