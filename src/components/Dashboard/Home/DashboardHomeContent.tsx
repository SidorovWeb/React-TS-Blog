import { FC } from 'react'
import { User } from '../../../types/user'
import { MyButton } from '../../UI/MyButton/MyButton'
import { ReactComponent as Writer } from '../../../images/writer.svg'
import { IPostListProps } from '../../../types/posts'
import List from '../../List/List'
import { DashboardPost } from '../DashboardPost'
import { Link, useNavigate } from 'react-router-dom'

interface DashboardHomeContentProps {
  user: User
  postList: IPostListProps[]
  isLoading: boolean
}

export const DashboardHomeContent: FC<DashboardHomeContentProps> = ({ user, postList, isLoading }) => {
  const navigate = useNavigate()

  return (
    <div className='flex-grow'>
      <div className='flex justify-between gap-5 flex-wrap bg-amber-400 rounded-lg overflow-hidden mb-6'>
        <div className='flex flex-col items-start p-4 max-w-xl'>
          <p className='text-3xl font-bold mb-4'>Привет {!isLoading && user.userName}!</p>
          <p className='mb-10'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloribus magnam earum labore iste omnis id
            soluta ullam! Expedita.
          </p>
          <MyButton className='btn p-4 mt-auto' onClick={() => navigate('/my-account/editor')}>
            Написать новый пост
          </MyButton>
        </div>
        <Writer className='2xl:block hidden' fill='#FBBF24' width={400} />
      </div>
      <div className='rounded-lg p-4'>
        <div className='flex justify-between mb-6 text-gray-700'>
          <span className='text-xl font-bold'>Последнии посты</span>
          <Link className='text-sm font-bold hover' to={'/my-account/posts'}>
            Постмотреть все
          </Link>
        </div>
        {!postList.length && <p className='font-bold text-2xl mt-10'>Список постов пуст &#128546;</p>}
        {!isLoading && (
          <List
            items={postList.slice(-3).reverse()}
            renderItem={(post: IPostListProps) => <DashboardPost post={post} key={post.id} />}
          />
        )}
      </div>
    </div>
  )
}
