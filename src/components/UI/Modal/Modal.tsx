import React, { FC, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const Modal: FC<ModalProps> = ({ children, open, onClose }) => {
  const appRootElement = document.querySelector('#App')
  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (open) {
      appRootElement?.appendChild(element)

      return () => {
        appRootElement?.removeChild(element)
      }
    }
  }, [open])

  return open ? (
    createPortal(
      <div
        className='fixed top-0 left-0 ring-0 bottom-0 w-screen h-screen flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm'
        onClick={onClose}
      >
        <div className='bg-white max-w-xl w-full' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      element
    )
  ) : (
    <></>
  )
}
