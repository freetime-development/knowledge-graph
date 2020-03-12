import { RootAction, RootTypeKeys } from '../actions/rootActions'

export interface RootState {
  root: string
}

const initialState: RootState = {
  root: 'default'
}

export default function rootReducer (
  state: RootState = initialState,
  action: RootAction
): RootState {
  switch (action.type) {
    case RootTypeKeys.ROOT_ACTION:
      return {
        ...state,
        root: action.payload
      }
    default:
      return state
  }
}
