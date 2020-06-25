import { BAD_REQUEST, OK } from 'http-status-codes';
import mocks from 'node-mocks-http';
import ResponseProvider from 'src/providers/ResponseProvider';

describe('ResponseProvider', () => {
    let responseProvider: ResponseProvider;
    beforeAll((done) => {
        responseProvider = new ResponseProvider();
        done();
    });

    it(`should create successful response`, (done) => {
        const response = mocks.createResponse();
        const expectedResponse = mocks.createResponse().status(BAD_REQUEST).json(1);

        const result = responseProvider.createBadRequestResponse(response, "message");
        expect(result.statusCode).toEqual(expectedResponse.statusCode);
        done();
    });

    it(`should create bad response`, (done) => {
        const response = mocks.createResponse();
        const expectedResponse = mocks.createResponse().status(OK).json(1);

        const result = responseProvider.createSuccessfullResponse(response, 1);
        expect(result.statusCode).toEqual(expectedResponse.statusCode);
        done();
    });
 });