import { Dispatch } from 'redux'
import { ModalAction, ModalState, ModalType } from '../../types/modalTypes'

export const modal = (open: boolean) => (dispatch: Dispatch<ModalAction>) => {
  dispatch({ type: ModalType.MODAL, payload: open })
}
