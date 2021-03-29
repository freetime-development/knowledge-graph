export const host = 'http://localhost:4000'

// Api Routes
export enum ApiRoutes {
  LOAD_NODES_BY_TOPIC = '/node'
}

export enum Routes {
  ROOT = '/',
  NOTE = '/note'
}

export const defaultApiConfig = {
  baseURL: host
}
