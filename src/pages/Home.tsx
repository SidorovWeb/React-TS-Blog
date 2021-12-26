import React, { useState } from 'react'
import { IPostListProps } from '../types/types'

import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { myPostList } from '../utils'

export const Home = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])

  return (
    <>
      <List
        items={postList.reverse().slice(1, -1)}
        renderItem={(post: IPostListProps) => <PostItem post={post} key={post.id} />}
      />
    </>
  )
}
