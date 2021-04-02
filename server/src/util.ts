const httpMocks = require('node-mocks-http')

export function httpMock({ method, url, payload }) {
    const request = httpMocks.createRequest({ method, url, payload });
    const response = httpMocks.createResponse()
    return { request, response }
}
