import React from 'react'
import NodeController from './controllers/nodeController'
import NoteController from './controllers/noteController'
import NodeService from './services/nodeService'
import NoTeService from './services/noteService'
import NodeStore from './stores/nodeStore'
import NoteStore from './stores/noteStore'

interface Store {
}

interface ControllerContext {
  nodeController: NodeController
  noteController: NoteController
}

const nodeStore = new NodeStore()
const nodeService = new NodeService()
const nodeController = new NodeController(nodeStore, nodeService)

const noteStore = new NoteStore()
const noteService = new NoTeService()
const noteController = new NoteController(noteStore, noteService)

export const storesContext = React.createContext<Store>({
})

const controllersContext = React.createContext<ControllerContext>({
  nodeController,
  noteController
})

const useStore = () => React.useContext<Store>(storesContext)
export const useController = () => React.useContext<ControllerContext>(controllersContext)

export default useStore

