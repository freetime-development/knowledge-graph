import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  isSidebarVisible: boolean
}

const initialState: UIState = {
  isSidebarVisible: false
}


const UISlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    toggleSidebarVisibility: (state: UIState, action: PayloadAction<undefined>) => { state.isSidebarVisible = !state.isSidebarVisible }
  }
})

export const { toggleSidebarVisibility } = UISlice.actions
export default UISlice.reducer
