import { Request, Response } from 'express'
import { Node } from '../../interface'
import NodeRepository from '../../repositories/nodeRepository/nodeRepository'

class NodeController {
	private nodeRepository: NodeRepository

  constructor(nodeRepository: NodeRepository) {
		this.nodeRepository = nodeRepository
	}

  getNodesByTopic = async (req: Request, res: Response) => {
    const topic = decodeURIComponent(req.params.topic)
    const result: Node[] = await this.nodeRepository.getByTopic(topic)

    return res.json(result)
	}

  setNode = async (req: Request, res: Response) => {
    const nodeData = {
      ...req.body,
      'dgraph.type': req.body.type
    }
    delete nodeData['type']

    await this.nodeRepository.set(nodeData)
    console.log('status 200')
    return res.status(200).send()
  }

  deleteNode = async (req: Request, res: Response) => {
    const uid = req.params.uid
    await this.nodeRepository.delete(uid)
    return res.status(202).send()
  }
}

export default NodeController
