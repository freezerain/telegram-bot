import { log, loge, Api, TelegramRepo } from '../../main.mjs';

const BASE_URL = 'https://api.chucknorris.io';
const ENDPOINT = 'jokes/random';

//https://api.chucknorris.io/
export default function call(metadata) {
	log('chuckNorrisApi call');
	return new Api(BASE_URL)
		.fetchData(ENDPOINT)
		.then(resp => {
			log('chuckNorrisApi response', resp);
			return resp;
		})
		.then(resp => {
			return new TelegramRepo(metadata.env)
				.sendMessage(metadata.chat_id, resp.value);
		})
		.then(resp => {
			log('chuckNorrisApi success');
			return resp;
		})
		.catch(e => {
			loge('chuckNorrisApi error', e.message);
			throw e;
		});
}
