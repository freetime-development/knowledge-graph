const httpMocks = require('node-mocks-http')

export class Message {
    public success: boolean
    public payload

    constructor(success?: boolean, payload?) {
        this.success = success || false
        this.payload = payload || null
    }

    setError = (error) => {
        this.success = false
        this.payload = error
    }

    setResult = (result) => {
        this.success = true
        this.payload = result
    }
}

export function httpMock({ method, url, payload }) {
    const request = httpMocks.createRequest({ method, url, payload });
    const response = httpMocks.createResponse()
    return { request, response }
}