import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '../../interface'

export interface NoteState {
  notes: Node[]
}

const initialState: NoteState = {
  notes: []
}

const NotesSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNodeToNotes: (state: NoteState, action: PayloadAction<Node>) => { state.notes.push(action.payload) }
  }
})

export const { addNodeToNotes } = NotesSlice.actions
export default NotesSlice.reducer
