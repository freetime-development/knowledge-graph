const dgraph = require('dgraph-js');
const grpc = require('grpc');

const clientStub = new dgraph.DgraphClientStub(
  // addr: optional, default: 'localhost:9080'
  'localhost:9080',
  // credentials: optional, default: grpc.credentials.createInsecure()
  grpc.credentials.createInsecure(),
);
const dgraphClient = new dgraph.DgraphClient(clientStub);

const dgraphRepo = {
  set: async () => {
    const schema = "name: string @index(exact) .";
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await dgraphClient.alter(op);
  }
}

export default dgraphRepo
