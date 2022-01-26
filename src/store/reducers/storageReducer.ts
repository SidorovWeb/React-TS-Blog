import { storageAction, storageState, storageType } from '../../types/storageTypes'

const initialState: storageState = {
  url: '',
  isLoading: false,
  error: null,
}

export const storageReducer = (state = initialState, action: storageAction): storageState => {
  switch (action.type) {
    case storageType.STORAGE_START:
      return { ...state, isLoading: true, error: null }
    case storageType.STORAGE_SUCCESS:
      return { ...state, isLoading: false, url: action.payload }
    case storageType.STORAGE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
