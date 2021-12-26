import React, { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const MyButton: FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}
