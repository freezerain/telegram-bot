import { expect } from 'chai';
import sinon from 'sinon';
import { FetchApi } from '#main';

describe('FetchApi', () => {
	describe('#fetchData', () => {
		it('should fetch data successfully', async () => {
			const baseUrl = 'https://example.com/api';
			const api = new FetchApi(baseUrl);

			// Stub the fetch function using Sinon
			const fetchStub = sinon.stub(globalThis, 'fetch');
			fetchStub.resolves({ ok: true, json: async () => ({ data: 'test data' }) });

			const endpoint = 'exampleEndpoint';
			const options = { method: 'GET' };
			const data = await api.fetchData(endpoint, options);

			// Ensure fetch was called with the correct URL and options
			const expectedUrl = `${baseUrl}/${endpoint}`;
			expect(fetchStub.calledWith(expectedUrl, options)).to.be.true;

			// Ensure the returned data matches the expected result
			expect(data).to.deep.equal({ data: 'test data' });

			// Restore the original fetch function
			fetchStub.restore();
		});

		it('should handle fetch error', async () => {
			const baseUrl = 'https://example.com/api';
			const api = new FetchApi(baseUrl);

			// Stub the fetch function to simulate an error
			const fetchStub = sinon.stub(globalThis, 'fetch');
			fetchStub.rejects(new Error('Fake fetch error'));

			const endpoint = 'exampleEndpoint';
			const options = { method: 'GET' };

			// Ensure the fetchData method throws the expected error
			try {
				await api.fetchData(endpoint, options);
				// If it doesn't throw an error, fail the test
				expect.fail('Expected an error but did not receive one.');
			} catch (error) {
				expect(error.message).to.equal('Fetch failed');
			}

			// Restore the original fetch function
			fetchStub.restore();
		});

		it('should handle non-ok response', async () => {
			const baseUrl = 'https://example.com/api';
			const api = new FetchApi(baseUrl);

			// Stub the fetch function to simulate a non-ok response
			const fetchStub = sinon.stub(globalThis, 'fetch');
			fetchStub.resolves({ ok: false, status: 404, statusText: 'Not Found', text: async () => 'Not Found' });

			const endpoint = 'exampleEndpoint';
			const options = { method: 'GET' };

			// Ensure the fetchData method throws the expected error for non-ok response
			try {
				await api.fetchData(endpoint, options);
				// If it doesn't throw an error, fail the test
				expect.fail('Expected an error but did not receive one.');
			} catch (error) {
				expect(error.message).to.equal('Fetch failed');
				expect(error.cause.message).to.equal('Response error, status: 404 - Not Found. Not Found');
			}

			// Restore the original fetch function
			fetchStub.restore();
		});
	});
});
