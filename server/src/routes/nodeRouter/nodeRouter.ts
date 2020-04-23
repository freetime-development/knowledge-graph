import { Router } from 'express'
import NodeController from '../../controllers/nodeController/nodeController'

function nodeRouter(nodeController: NodeController) {
  const router = Router()

  // TODO to queryParams and add general filter
  router.get('/:topic', async (req, res) => await nodeController.getNodesByTopic(req, res))
  // used both for creating and updating nodes
  router.post('/set', async (req, res) => await nodeController.setNode(req, res))
  router.delete('/:uid', async (req, res) => await nodeController.deleteNode(req, res))

  return router
}

export default nodeRouter
