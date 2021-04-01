import axios, { AxiosInstance, AxiosResponse, Canceler, CancelTokenSource } from 'axios'
import { defaultApiConfig, ApiRoutes } from '../conf'
import { Node } from '../interface'

interface Config {

}

export default class NodeService {
  api: AxiosInstance
  source: CancelTokenSource

  constructor(config: Config = defaultApiConfig) {
    this.api = axios.create(config)
    this.source = axios.CancelToken.source()
  }

  getNodesByTopic (topic: string): Promise<AxiosResponse<Node[]>> {
    const response = this.api.get<Node[]>(`${ApiRoutes.LOAD_NODES_BY_TOPIC}/${topic}`)

    return response
  }
}

