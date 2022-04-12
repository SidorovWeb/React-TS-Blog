export interface MenuState {
  open: boolean
}

export enum MenuType {
  MENU = 'MENU',
}

export interface MenuAction {
  type: MenuType.MENU
  payload: boolean
}
