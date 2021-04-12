import React from 'react'
import NodeController from './controllers/nodeController'
import NoteController from './controllers/noteController'
import UserController from './controllers/userController'
import NodeService from './services/nodeService'
import NoTeService from './services/noteService'
import UserService from './services/userService'
import NodeStore from './stores/nodeStore'
import NoteStore from './stores/noteStore'
import UserStore from './stores/userStore'

interface Store {
}

interface ControllerContext {
  nodeController: NodeController
  noteController: NoteController
  userController: UserController
}

const nodeStore = new NodeStore()
const nodeService = new NodeService()
const nodeController = new NodeController(nodeStore, nodeService)

const noteStore = new NoteStore()
const noteService = new NoTeService()
const noteController = new NoteController(noteStore, noteService)

const userStore = new UserStore()
const userService = new UserService()
const userController = new UserController(userStore, userService)

export const storesContext = React.createContext<Store>({
})

const controllersContext = React.createContext<ControllerContext>({
  nodeController,
  noteController,
  userController
})

const useStore = () => React.useContext<Store>(storesContext)
export const useController = () => React.useContext<ControllerContext>(controllersContext)

export default useStore

