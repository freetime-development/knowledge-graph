import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { Node, NodeResponse } from '../../interface'
import { host, ApiRoutes } from '../../conf'

const request = axios.create({
  baseURL: host
})

export interface NodeState {
  nodes: Node[]
  error: string
}

const initialState: NodeState = {
  nodes: [],
  error: ''
}

export const loadNodesByTopic = createAsyncThunk<Node[], string, {}>('loadNodesByTopic', async (topic: string) => {
  const response = await request.get<NodeResponse>(`${ApiRoutes.LOAD_NODES_BY_TOPIC}/${topic}`)
  console.log(response)
  return response.data.payload
})

const NodesSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadNodesByTopic.fulfilled,
      (state: NodeState, action: PayloadAction<Node[]>) => { state.nodes = action.payload }
    ),
    builder.addCase(
      loadNodesByTopic.rejected,
      (state: NodeState, action: PayloadAction<unknown, string, unknown, SerializedError>) => {
        state.error = action.error.message
      }
    )
  }
})

export default NodesSlice.reducer
