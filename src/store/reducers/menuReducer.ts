import { MenuAction, MenuType } from '../../types/menuType'

const initialState = {
  open: false,
}

export const menuReducer = (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case MenuType.MENU:
      return { ...state, open: action.payload }
    default:
      return state
  }
}
