import axios, { AxiosInstance, AxiosResponse, Canceler, CancelTokenSource } from 'axios'
import { defaultApiConfig, ApiRoutes } from '../conf'

interface Config {

}

export default class NoTeService {
  api: AxiosInstance
  source: CancelTokenSource

  constructor(config: Config = defaultApiConfig) {
    this.api = axios.create(config)
    this.source = axios.CancelToken.source()
  }
}

