import { IPostListProps } from '../types/postsTypes'

import List from '../components/List/List'
import { PostItem } from '../components/Posts/PostListItem'
import { useSelector } from '../hooks/useTypedSelector'

export const Home = () => {
  const posts = useSelector((state) => state.post.posts.filter((p) => p.status.type === 'published'))

  return (
    <div className='grid grid-cols-1 gap-5'>
      <List
        items={posts.reverse().slice(1)}
        renderItem={(post: IPostListProps) => <PostItem post={post} key={post.id} />}
      />
    </div>
  )
}
