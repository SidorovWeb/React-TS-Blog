import React, { FC } from 'react'

interface TitleProps {
  title: string
}

export const Title: FC<TitleProps> = ({ title }) => {
  return <div className='text-2xl lg:text-4xl font-bold pt-3 pb-12'>{title}</div>
}
