import { log, loge, buildError } from '../main.mjs';

const TAG = 'fetchApi';
export default class Api {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	fetchData(endpoint = null, options = {}) {
		const url = `${this.baseUrl}${endpoint ? '/' + endpoint : ''}`;
		return fetch(url, options)
			.then(resp => {
				if (!resp.ok) {
					return resp.text().then(text => {
						throw buildError(TAG, new Error(`Response was error, status: ${resp.status} - ${resp.statusText}. text: ${text}`))
					})
				}
				return resp.json();
			})
			.catch(e => {
				throw buildError(TAG, e, 'Fetch failed');
			});
	}
}
