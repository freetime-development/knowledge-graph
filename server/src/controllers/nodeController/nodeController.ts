import { Request, Response } from 'express'
import NodeRepository from '../../repositories/nodeRepository/nodeRepository'
import { Message } from '../../util'

class NodeController {
	private nodeRepository: NodeRepository

  constructor(nodeRepository: NodeRepository) {
		this.nodeRepository = nodeRepository
	}

  getNodesByTopic = async (req: Request, res: Response) => {
    const topic = decodeURIComponent(req.params.topic)
    const result: Message = await this.nodeRepository.getByTopic(topic)

    return res.json(result)
	}
	
  setNode = async (req: Request, res: Response) => {
    const nodeData = {
      ...req.body,
      'dgraph.type': req.body.type
    }
    delete nodeData['type']

    const result: Message = await this.nodeRepository.set(nodeData)
    return res.json(result)
  }

  deleteNode = async (req: Request, res: Response) => {
    const uid = req.params.uid
    const result: Message = await this.nodeRepository.delete(uid)
    return res.json(result)
  }
}

export default NodeController
