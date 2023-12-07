import { log, loge } from '../main.mjs';

const TAG = 'fetchApi';
export default class Api {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	fetchData(endpoint, options = {}) {
		const url = `${this.baseUrl}/${endpoint}`;
		return fetch(url, options)
			.then(resp => resp.json())
			.catch(e => {
				loge(TAG, 'error fetching url', e.message);
				throw e;
			});
	}
}