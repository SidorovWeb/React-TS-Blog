import { Dispatch } from 'redux'
import { MenuAction, MenuType } from '../../types/menuType'

export const menu = (open: boolean) => (dispatch: Dispatch<MenuAction>) => {
  dispatch({ type: MenuType.MENU, payload: open })
}
