import Api from '../../src/api/fetchApi';

// Mock the fetch function
global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ data: 'test data' }),
	})
);

describe('Api', () => {
	describe('fetchData', () => {
		it('should fetch data successfully', async () => {
			const api = new Api('https://example.com/api');
			const data = await api.fetchData('endpoint');
			expect(fetch).toHaveBeenCalledWith('https://example.com/api/endpoint', {});
			expect(data).toEqual({ data: 'test data' });
		});

		it('should handle error response', async () => {
			// Mock a non-ok response
			global.fetch.mockImplementationOnce(() =>
				Promise.resolve({
					ok: false,
					status: 404,
					statusText: 'Not Found',
					text: () => Promise.resolve('Error message'),
				})
			);

			const api = new Api('https://example.com/api');
			await expect(api.fetchData('endpoint')).rejects.toThrow(
				'Response was error, status: 404 - Not Found. text: Error message'
			);
		});

		it('should handle fetch error', async () => {
			// Mock a fetch error
			global.fetch.mockImplementationOnce(() =>
				Promise.reject(new Error('Network error'))
			);

			const api = new Api('https://example.com/api');
			await expect(api.fetchData('endpoint')).rejects.toThrow(
				'Fetch failed: Network error'
			);
		});
	});
});
