import { assert } from 'chai';
import sinon from 'sinon';
import { FetchApi } from '#main';

describe('FetchApi', () => {
	const baseUrl = 'https://example.com/api';
	const exampleEndpoint = 'exampleEndpoint';
	let api;

	beforeEach(() => {
		api = new FetchApi(baseUrl);
	});
	afterEach(() => {
		sinon.restore();
	});

	it('should fetch data successfully', async () => {
		const fakeFetch = sinon.fake.resolves({ ok: true, json: async () => ({ data: 'test data' }) });
		sinon.replace(globalThis, 'fetch', fakeFetch);
		const data = await api.fetchData(exampleEndpoint, { method: 'GET' });
		assert.isTrue(fakeFetch.calledWith(`${baseUrl}/${exampleEndpoint}`, { method: 'GET' }));
		assert.deepEqual(data, { data: 'test data' });
	});

	it('should handle fetch error', async () => {
		const fakeFetch = sinon.fake.rejects(new Error('Fake fetch error'));
		sinon.replace(globalThis, 'fetch', fakeFetch);
		try {
			await api.fetchData(exampleEndpoint, { method: 'GET' });
			assert.fail('Expected an error but did not receive one.');
		} catch (error) {
			assert.equal(error.message, 'Fetch failed');
		}
	});

	it('should handle non-ok response', async () => {
		const fakeFetch = sinon.fake.resolves({
			ok: false,
			status: 404,
			statusText: 'Not Found',
			text: async () => 'Not Found'
		});
		sinon.replace(globalThis, 'fetch', fakeFetch);
		try {
			await api.fetchData(exampleEndpoint, { method: 'GET' });
			assert.fail('Expected an error but did not receive one.');
		} catch (error) {
			assert.equal(error.message, 'Fetch failed');
			assert.equal(error.cause.message, 'Response error, status: 404 - Not Found. Not Found');
		}
	});
});
