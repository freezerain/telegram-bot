import { log, loge, Api, TelegramRepo } from '../../main.mjs';

const TAG = 'chuckNorrisApi';
const BASE_URL = 'https://api.chucknorris.io';
const ENDPOINT = 'jokes/random';

//https://api.chucknorris.io/
export default function call(metadata) {
	log(TAG, 'api request');
	return new Api(BASE_URL)
		.fetchData(ENDPOINT)
		.then(resp => {
			log(TAG, 'api response', resp);
			return resp;
		})
		.then(resp => {
			log(TAG, 'forwarding to telegram', resp);
			return new TelegramRepo(metadata.env)
				.sendMessage(metadata.chat_id, resp.value);
		})
		.then(resp => {
			log(TAG, 'api success');
			return resp;
		})
		.catch(e => {
			loge(TAG, 'api error', e.message);
			throw e;
		});
}