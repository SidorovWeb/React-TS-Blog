export interface ModalState {
  open: boolean
}

export enum ModalType {
  MODAL = 'MODAL',
}

export interface ModalAction {
  type: ModalType.MODAL
  payload: boolean
}
