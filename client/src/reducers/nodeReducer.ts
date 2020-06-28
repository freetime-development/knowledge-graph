import { NodeActions, NodeTypeKeys } from '../actions/nodeActions'
import { Node } from '../interface'

export interface RootState {
  nodes: Node[]
  error: string
}

const initialState: RootState = {
  nodes: [],
  error: ''
}

export default function rootReducer (
  state: RootState = initialState,
  action: NodeActions
): RootState {
  switch (action.type) {
    case NodeTypeKeys.LOAD_NODES_BY_TOPIC_SUCCESS:
      return {
        ...state,
        nodes: action.nodes
      }
    case NodeTypeKeys.LOAD_NODES_BY_TOPIC_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
