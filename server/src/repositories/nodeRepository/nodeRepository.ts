import * as dgraph from 'dgraph-js'
import * as grpc from 'grpc'
import { Node } from '../../interface'
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

  async getByTopic(topic: string): Promise<Node[]> {
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

      return result
    } catch(error) {
      throw new Error('Could not get nodes byTopic')
    } finally {
      await txn.discard()
    }
  }

  async set(nodeData: Node): Promise<void> {
    const txn = this.client.newTxn()
    try {
      const mutation = new dgraph.Mutation()
      mutation.setSetJson(nodeData)
      mutation.setCommitNow(true)

      console.log('nodeData', nodeData)
      await txn.mutate(mutation)
    } catch (error) {
      console.log(error)
    } finally {
      await txn.discard()
    }

    return
  }

  async delete(uid: string): Promise<void> {
    const txn = this.client.newTxn()
    try {
      const mutation = new dgraph.Mutation()
      mutation.setDeleteJson({ uid })
      mutation.setCommitNow(true)

      await txn.mutate(mutation)
    } catch (error) {
      console.log(error)
    } finally {
      await txn.discard()
    }

    return
  }
}

export default NodeRepository
