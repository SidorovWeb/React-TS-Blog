import React, { FC } from 'react'
import { IPostListProps } from '../../../types/postsTypes'
import { MyButton } from '../../UI/MyButton/MyButton'

interface EditorSidebarAdminProps {
  post: IPostListProps
}

export const EditorSidebarAdmin: FC<EditorSidebarAdminProps> = ({ post }) => {
  return (
    <>
      <MyButton
        className='btn p-4 w-full mb-4'
        // onClick={() =>
        //   dispatch(
        //     postStatus({
        //       type: 'pending',
        //       message: 'Пост успешно отправлен на модерацию',
        //     })
        //   )
        // }
      >
        Опубликовать
      </MyButton>
      <MyButton
        className='btn p-4 w-full mb-4'
        // onClick={() =>
        //   dispatch(
        //     postStatus({
        //       type: 'pending',
        //       message: 'Пост успешно отправлен на модерацию',
        //     })
        //   )
        // }
      >
        Отменить
      </MyButton>
    </>
  )
}

// опубликовать
