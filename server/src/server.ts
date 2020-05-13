const bodyParser = require('body-parser')
const express = require('express')
// Applications imports
import { paths } from './conf'
import config from './config'
import nodeRouter from './routes/nodeRouter/nodeRouter'
import NodeController from './controllers/nodeController/nodeController'
import NodeRepository from './repositories/nodeRepository/nodeRepository'

const app = express()
const host = 'http://localhost'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.options("*", function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//   res.send(200)
// })

// Initialize Controllers and Repositories
const nodeRepository = new NodeRepository()
const nodeController = new NodeController(nodeRepository)

// Declare routes
app.use(paths.nodes, nodeRouter(nodeController))

// Handle undefined routes
app.use("*", (_, res) => {
  res.send('Hello from root')
})

app.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.info('==> Listening on port %s in %s mode. Open up %s:%s/ in your browser.', config.port, process.env.NODE_ENV, host, config.port)
})

export default app
