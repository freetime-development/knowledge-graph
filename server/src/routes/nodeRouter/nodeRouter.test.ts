import * as sinon from 'sinon'
import { expect } from 'chai'
import nodeRouter from './nodeRouter'
import NodeController from '../../controllers/nodeController/nodeController'
import NodeRepository from '../../repositories/nodeRepository/nodeRepository'

const repository = new NodeRepository()
sinon.mock(repository)

const controller = new NodeController(repository)
sinon.mock(controller)

const router = nodeRouter(controller)

describe('NODE ROUTER UNIT TEST', function() {
    it("checks paths and methods of nodeRouter", function() {
        expect(router.stack).to.have.length(3)
        expect(router.stack[0].route.path).to.eq('/:topic')
        expect(router.stack[0].route.stack[0].method).to.eq('get')
        expect(router.stack[1].route.path).to.eq('/set')
        expect(router.stack[1].route.stack[0].method).to.eq('post')
        expect(router.stack[2].route.path).to.eq('/:uid')
        expect(router.stack[2].route.stack[0].method).to.eq('delete')
    })
})
