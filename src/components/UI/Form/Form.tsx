import { FC } from 'react'

interface FormProps {
  children: React.ReactNode
}

export const Form: FC<FormProps> = ({ children }) => {
  return <form className='text-lg mb-10'>{children}</form>
}
