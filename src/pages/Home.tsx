import React, { useState } from 'react'
import { IPostListProps } from '../types/postsTypes'

import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { myPostList } from '../utils'

export const Home = () => {
  const [postList, setPostList] = useState<IPostListProps[]>([...myPostList])

  return (
    <div className='grid grid-cols-1 gap-5'>
      <List
        items={postList.reverse().slice(1)}
        renderItem={(post: IPostListProps) => <PostItem post={post} key={post.id} />}
      />
    </div>
  )
}
