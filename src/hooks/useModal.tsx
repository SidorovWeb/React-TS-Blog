import { FC, useState } from 'react'
import { Modal as ModalComponent } from '../components/UI/Modal/Modal'

export function useModal() {
  const [isActive, setIsActive] = useState(false)

  const show = () => setIsActive(true)
  const hide = () => setIsActive(false)

  const Modal: FC<any> = ({ children }) => (
    <>
      {isActive && (
        <div onClick={hide}>
          <ModalComponent>{children}</ModalComponent>
        </div>
      )}
    </>
  )

  return {
    show,
    hide,
    Modal,
  }
}
