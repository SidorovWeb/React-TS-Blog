import { FC } from 'react'
import { User } from '../../types/user'
import { MyButton } from '../UI/MyButton/MyButton'
import { ReactComponent as Writer } from '../../images/writer.svg'
import { IPostListProps } from '../../types/posts'
import List from '../List/List'
import { DashboardPost } from './DashboardPost'

interface DashboardContentProps {
  user: User
  postList: IPostListProps[]
}

export const DashboardContent: FC<DashboardContentProps> = ({ user, postList }) => {
  return (
    <div className='flex-grow'>
      <div className='flex justify-between gap-5 bg-amber-400 rounded-lg overflow-hidden mb-6'>
        <div className='flex flex-col items-start p-4 max-w-xl'>
          <p className='text-3xl font-bold mb-4'>Привет {user.userName}!</p>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloribus magnam earum labore iste omnis id
            soluta ullam! Expedita.
          </p>
          <MyButton className='btn p-4 mt-auto'>Написать новый пост</MyButton>
        </div>
        <Writer fill='#FBBF24' width={400} />
      </div>
      <div className='rounded-lg p-4'>
        <div className='flex justify-between mb-6 text-gray-500'>
          <span className='text-xl font-bold'>Последнии посты</span>
          <span className='text-sm font-bold'>Постмотреть все</span>
        </div>
        <List
          items={postList.slice(-3).reverse()}
          renderItem={(post: IPostListProps) => <DashboardPost post={post} key={post.id} />}
        />
      </div>
    </div>
  )
}
