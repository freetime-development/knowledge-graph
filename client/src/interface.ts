import { NodeState } from './features/nodes/nodeReducer'
import { NoteState } from './features/notes/noteReducer'
import { UIState } from './features/sidebar/sidebar';

export interface RootState {
  node: NodeState
  ui: UIState
  note: NoteState
}

export interface NodeResponse {
  success: boolean
  payload: Node[]
}

export enum NodeType {
  Video = 'Video',
  Text = 'Text'
}

export interface Node {
  uid: string
  title: string
  topic: string
  url: string
  origin: string
  favIconUrl: string
  contentId: string
  annotation: string
  refs: string[]
  date: string
  'dgraph.type': NodeType
  embedUrl?: string
  text?: string
}
