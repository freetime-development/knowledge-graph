import * as dgraph from 'dgraph-js'
import * as grpc from 'grpc'
import { Node } from '../../interface'
import { Message } from '../../util'

interface Options {
  address: string
  credentials: any // TODO add correct type when we know what secure channel we gonna use
}

class NodeRepository {
  private client: dgraph.DgraphClient
  private options: Options

  constructor(options?: Options) {
    this.options = options || { address: 'localhost:9080', credentials: grpc.credentials.createInsecure() }
    const clientStub = new dgraph.DgraphClientStub(this.options.address, this.options.credentials)
    this.client = new dgraph.DgraphClient(clientStub)
  }

  async getByTopic(topic: string): Promise<Message> {
    const message: Message = new Message()
    const txn = this.client.newTxn()
    const query = `
      query byTopic($topic: string) {
        byTopic(func: eq(topic, $topic)) {
          uid,
          title,
          topic,
          url,
          favIconUrl,
          contentId,
          annotation,
          date,
          embedUrl,
          text
        }
      }
    `
    try {
      const vars = { $topic: topic }
      const res = await txn.queryWithVars(query, vars)
      const result: Node[] = res.getJson()['byTopic']
  
      message.setResult(result)
    } catch(error) {
      message.setError(error)
    } finally {
      await txn.discard()
    }

    return message
  }

  async set(nodeData: Node): Promise<Message> {
    const message: Message = new Message()
    const txn = this.client.newTxn()
    try {
      const mutation = new dgraph.Mutation()
      mutation.setSetJson(nodeData)
      mutation.setCommitNow(true)

      console.log('nodeData', nodeData)
      await txn.mutate(mutation)

      message.setResult(null)
    } catch (error) {
      message.setError(error)
      console.log(error)
    } finally {
      await txn.discard()
    }

    return message
  }

  async delete(uid: string): Promise<Message> {
    const message: Message = new Message()
    const txn = this.client.newTxn()
    try {
      const mutation = new dgraph.Mutation()
      mutation.setDeleteJson({ uid })
      mutation.setCommitNow(true)

      await txn.mutate(mutation)

      message.setResult(null)
    } catch (error) {
      message.setError(error)
      console.log(error)
    } finally {
      await txn.discard()
    }

    return message
  }
}

export default NodeRepository
