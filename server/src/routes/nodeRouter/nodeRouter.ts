import { Router } from 'express'
import cors from 'cors'
import NodeController from '../../controllers/nodeController/nodeController'

const corsOptions = {
  origin: 'http://localhost:2000'
}

function nodeRouter(nodeController: NodeController) {
  const router = Router()

  // TODO to queryParams and add general filter
  router.get('/:topic', cors(corsOptions), async (req, res) => await nodeController.getNodesByTopic(req, res))
  // used both for creating and updating nodes
  router.post('/set', cors(corsOptions), async (req, res) => await nodeController.setNode(req, res))
  router.delete('/:uid', cors(corsOptions), async (req, res) => await nodeController.deleteNode(req, res))

  return router
}

export default nodeRouter
