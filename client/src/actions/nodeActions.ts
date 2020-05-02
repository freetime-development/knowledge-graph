import axios, { AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers/nodeReducer'
import { Action } from 'redux'
import { host, loadNodesByTopicPath } from '../conf'
import { NodeResponse, Node } from '../interface'

const request = axios.create({
  baseURL: host
})

export type NodeActions =
  LoadNodesByTopicAction |
  LoadNodesByTopicSuccess |
  LoadNodesByTopicError

export enum NodeTypeKeys {
  LOAD_NODES_BY_TOPIC = 'LOAD_NODES_BY_TOPIC',
  LOAD_NODES_BY_TOPIC_SUCCESS = 'LOAD_NODES_BY_TOPIC_SUCCESS',
  LOAD_NODES_BY_TOPIC_ERROR = 'LOAD_NODES_BY_TOPIC_ERROR'
}

export interface LoadNodesByTopicAction {
  type: NodeTypeKeys.LOAD_NODES_BY_TOPIC
  topic: string
}

export interface LoadNodesByTopicSuccess {
  type: NodeTypeKeys.LOAD_NODES_BY_TOPIC_SUCCESS
  nodes: Node[]
}

export interface LoadNodesByTopicError {
  type: NodeTypeKeys.LOAD_NODES_BY_TOPIC_ERROR
  error: string
}

export const loadNodesByTopicSuccess = (nodes: Node[]): LoadNodesByTopicSuccess => ({
  type: NodeTypeKeys.LOAD_NODES_BY_TOPIC_SUCCESS,
  nodes
})

export const loadNodesByTopicError = (error: string): LoadNodesByTopicError => ({
  type: NodeTypeKeys.LOAD_NODES_BY_TOPIC_ERROR,
  error
})

type LoadNodesByTopicThunkAction = ThunkAction<void, RootState, any, Action<any>>

export const loadNodesByTopic = (topic: string): LoadNodesByTopicThunkAction => (dispatch) => {
  request.get(`${loadNodesByTopicPath}/${topic}`).then((response: AxiosResponse<NodeResponse>) => {
    if (response.status === 200) {
      const nodes: NodeResponse = response.data
      dispatch(loadNodesByTopicSuccess(nodes.payload))
    } else {
      dispatch(loadNodesByTopicError("error"))
    }
  }).catch(_ => {
    dispatch(loadNodesByTopicError("error"))
  })
}
