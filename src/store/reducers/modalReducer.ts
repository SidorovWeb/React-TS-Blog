import { ModalAction, ModalType } from '../../types/modalTypes'

const initialState = {
  open: false,
}

export const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalType.MODAL:
      return { ...state, open: action.payload }
    default:
      return state
  }
}
