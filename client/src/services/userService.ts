import Auth from '@aws-amplify/auth'
import axios, { AxiosInstance, CancelTokenSource } from 'axios'
import { defaultApiConfig } from '../conf'
import { User } from '../interfaces/user'

interface Config {

}

export default class UserService {
  api: AxiosInstance
  source: CancelTokenSource

  constructor(config: Config = defaultApiConfig) {
    this.api = axios.create(config)
    this.source = axios.CancelToken.source()
  }

  async getLoggedInUser (): Promise<User> {
    const response = await Auth.currentUserInfo()
    return { username: response.username }
  }
}

