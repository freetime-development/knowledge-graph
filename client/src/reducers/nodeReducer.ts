import { NodeActions, NodeTypeKeys } from '../actions/nodeActions'
import { Node } from '../interface'

export interface NodeState {
  nodes: Node[]
  error: string
}

const initialState: NodeState = {
  nodes: [],
  error: ''
}

export default function rootReducer (
  state: NodeState = initialState,
  action: NodeActions
): NodeState {
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
