export default class FetchApi {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	fetchData(endpoint = null, options = {}) {
		const url = `${this.baseUrl}${endpoint ? '/' + endpoint : ''}`;
		return fetch(url, options)
			.then(resp => {
				if (!resp.ok) {
					return resp.text().then(text => {
						throw new Error(`Response error, status: ${resp.status} - ${resp.statusText}. ${text}`);
					})
				}
				return resp.json();
			})
			.catch(e => {
				throw new Error('Fetch failed', { cause: e });
			});
	}
}
