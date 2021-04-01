import NodeService from "../services/nodeService";
import NodeStore, { States } from "../stores/nodeStore";


export default class NodeController {
  store: NodeStore
  service: NodeService

  constructor (nodeStore: NodeStore, nodeService: NodeService) {
    this.store = nodeStore
    this.service = nodeService
  }

  getNodesByTopic = (topic: string): () => void => {
    this.store.setState(States.LOADING)

    const response = this.service.getNodesByTopic(topic)
    const previousValue = this.store.nodes

    response.then((response) => {
      this.store.setNodes(response.data.payload)
    }).catch((error) => {
      this.store.setError("GetNodesByTopic Error")
      console.log('GetNodesByTopic Error', error)
    })

    return () => {
      this.store.setNodes(previousValue)
      this.store.setError("GetNodesByTopic Error")
      this.store.setState(States.IDLE)
    }
  }
}


