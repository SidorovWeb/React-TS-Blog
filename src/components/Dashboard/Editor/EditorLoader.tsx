import React, { FC, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Spin } from '../../UI/Spin/Spin'

interface EditorLoaderProps {
  isLoading: boolean
}

export const EditorLoader: FC<EditorLoaderProps> = ({ isLoading }) => {
  const appRootElement = document.querySelector('#App')
  const element = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (isLoading) {
      appRootElement?.appendChild(element)

      return () => {
        appRootElement?.removeChild(element)
      }
    }
  }, [isLoading])

  return isLoading ? (
    createPortal(
      <div className='fixed top-0 left-0 ring-0 bottom-0 w-screen h-screen flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm'>
        <div className='text-2xl text-white font-bold'>Обработка задания...</div>
      </div>,
      element
    )
  ) : (
    <></>
  )
}
