import { unstable_dev } from 'wrangler';
import { expect } from 'chai';

describe('Unstable_dev fetch', () => {
	let worker;

	before(async () => {
		worker = await unstable_dev('./src/index.js', {
			local: true,
			experimental: { disableExperimentalWarning: true }
		});
	});

	it('fetching', async () => {
		const res = await worker.fetch();
		const text = await res.text();
		expect(text).to.not.be.null;
	});

	after(async () => {
		await worker.stop();
	});
});
