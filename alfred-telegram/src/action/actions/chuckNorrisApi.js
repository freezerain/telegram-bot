import {log, loge, Api, TelegramApi, buildError} from '../../main.mjs';

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
			return new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN)
				.sendMessage({chat_id: metadata.chat_id, text: resp.value, reply_to_message_id: metadata.message_id});
		})
		.then(resp => {
			log(TAG, 'api success');
			return resp;
		})
		.catch(e => {
			throw buildError(TAG, e);
		});
}
