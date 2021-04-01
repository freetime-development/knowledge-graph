import { Store } from '@material-ui/icons'
import React from 'react'
import NodeController from './controllers/nodeController'
import NoteController from './controllers/noteController'
import NodeService from './services/nodeService'
import NoTeService from './services/noteService'
import TranslationService from './services/translationService'
import NodeStore from './stores/nodeStore'
import NoteStore from './stores/noteStore'
import TranslationStore from './stores/translationStore'

interface Store {
  // translationStore: TranslationStore
}

interface ControllerContext {
  nodeController: NodeController
  noteController: NoteController
}

const translationService = new TranslationService()
// const translationStore = new TranslationStore(translationService)

const nodeStore = new NodeStore()
const nodeService = new NodeService()
const nodeController = new NodeController(nodeStore, nodeService)

const noteStore = new NoteStore()
const noteService = new NoTeService()
const noteController = new NoteController(noteStore, noteService)

export const storesContext = React.createContext<Store>({
  // translationStore,
})

const controllersContext = React.createContext<ControllerContext>({
  nodeController,
  noteController
})

const useStore = () => React.useContext<Store>(storesContext)
export const useController = () => React.useContext<ControllerContext>(controllersContext)

export default useStore

