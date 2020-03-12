import { Controller } from '../interfaces'
import dgraphRepo from '../repositories/dgraphRepo'

const dgraph: Controller = {
    get: (req, res) => {
        res.send('Hello from api server!')
    },
    post: (req, res) => {
        const { body } = req
        // dgraphRepo.set(body)
        console.log(res.getHeaders(), body)
        res.send(body)
    }
}

export default dgraph
