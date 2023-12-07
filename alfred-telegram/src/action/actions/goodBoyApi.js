import { log, loge, Api, TelegramRepo } from '../../main.mjs';

const TAG = 'goodBoyApi';
const GOOD_BOY_BASE_URL = 'https://dog.ceo/api';
const GOOD_BOY_ENDPOINT = 'breeds/image/random';
const GOOD_BOY_CAPTION = '🐶🐶🐶';
export default function call(metadata) {
	log(TAG, 'api request');
	return new Api(GOOD_BOY_BASE_URL)
		.fetchData(GOOD_BOY_ENDPOINT)
		.then(resp => {
			log(TAG, 'api response', resp);
			return resp;
		})
		.then(resp => {
			return new TelegramRepo(metadata.env)
				.sendPhoto(metadata.chat_id, resp.message, GOOD_BOY_CAPTION);
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