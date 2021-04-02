import * as sinon from 'sinon'
import * as chai from 'chai'
const sinonChai = require("sinon-chai");

import NodeController from '../../controllers/nodeController/nodeController'
import NodeRepository from '../../repositories/nodeRepository/nodeRepository'
import { mockNode } from '../../mocks/nodes'
import { httpMock } from '../../util';

chai.use(sinonChai)
const { expect } = chai

describe('NODE CONTROLLER UNIT TEST', function() {
    const repository = new NodeRepository()

    it("should call getNode method on NodeController", async function() {
        const { request, response } = httpMock({
            method: 'GET',
            url: '/nodes',
            payload: {
              nodeId: 42
            }
        })
        expect(repository.getByTopic).to.exist
        sinon.stub(repository, 'getByTopic').resolves([mockNode])

        const controller = new NodeController(repository)
        sinon.spy(controller, 'getNodesByTopic')

        await controller.getNodesByTopic(request, response)
        const data = response._getData()

        expect(controller.getNodesByTopic).to.have.been.calledWith(request, response)
        expect(data).to.eql(JSON.stringify([mockNode]))
    })

    it("should call setNode method on NodeController", async function() {
        const { request, response } = httpMock({
            method: 'POST',
            url: '/nodes/set',
            payload: mockNode
        })
        expect(repository.set).to.exist
        sinon.stub(repository, 'set').resolves()

        const controller = new NodeController(repository)
        sinon.spy(controller, 'setNode')

        await controller.setNode(request, response)
        const data = response._getData()

        expect(controller.setNode).to.have.been.calledWith(request, response)
        expect(data).to.eq('')
    })
})

