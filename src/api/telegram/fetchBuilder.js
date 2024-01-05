import { log, loge } from '#main';

const TAG = 'fetchBuilder';
const DEFAULT_METHOD = 'POST';

export default class FetchBuilder {
	constructor(api) {
		this.api = api;
	}

	build(endpoint, params, fetchMethod = DEFAULT_METHOD) {
		const formData = new FormData();
		Object.entries(params).filter(([key, value]) => value !== null && value !== undefined)
			.forEach(([key, value]) => {
				formData.append(key, value);
			});
		const options = {
			method: fetchMethod,
			body: formData
		};
		return this.api.fetchData(endpoint, options)
			.catch(e => {
				throw new Error(`Fetch telegram ${endpoint} failed`, { cause: e });
			});
	}

}
