import { UIActions, UITypeKeys } from '../actions/UIActions'

export interface UIState {
  isSidebarVisible: boolean
}

const initialState: UIState = {
  isSidebarVisible: false
}

export default function rootReducer (
  state: UIState = initialState,
  action: UIActions
): UIState {
  switch (action.type) {
    case UITypeKeys.TOGGLE_SIDEBAR_VISIBILITY:
      return {
        ...state,
        isSidebarVisible: !state.isSidebarVisible
      }
    default:
      return state
  }
}
