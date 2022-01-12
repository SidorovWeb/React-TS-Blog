import { TypedUseSelectorHook, useSelector as useTypeSelector } from 'react-redux'
import { RootState } from '../store/reducers'

export const useSelector: TypedUseSelectorHook<RootState> = useTypeSelector
