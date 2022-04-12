import React, { FC } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  open?: boolean
}

export const Modal: FC<ModalProps> = React.memo(({ children, open }) => {
  const modalEle = document.getElementById('modal')
  if (!modalEle) return null

  return createPortal(
    <div className='overlay shadow-lg fade flex items-center justify-center !z-[1020] bg-black/30 cursor-pointer'>
      <div
        className='bg-white w-full lg:w-[450px] rounded-lg overflow-hidden mx-4 px-4 py-6 lg:p-8 cursor-auto lg:mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalEle
  )
})
