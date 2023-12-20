import { jest } from '@jest/globals';
import { unstable_dev } from 'wrangler';

describe('Unstable_dev fetch', () => {
	let worker;

	beforeAll(async () => {
		worker = await unstable_dev('./src/index.js', {
			local: true,
			experimental: { disableExperimentalWarning: true }
		});
	});

	it('fetching', async () => {
		const text = await worker.fetch().then((res) => res.text());
		expect(text).not.toBeNull();
	});

	afterAll(async () => {
		await worker.stop();
	});

});
