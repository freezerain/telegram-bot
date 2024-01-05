import { log, FetchApi, TelegramApi } from '#main';
import {strings} from '#res';

const TAG = 'goodBoyApi';
const GOOD_BOY_BASE_URL = 'https://dog.ceo/api';
const GOOD_BOY_RANDOM_BREED_TAG = 'breeds/image';
const GOOD_BOY_ENDPOINT = 'random';
const GOOD_BOY_CAPTION = strings.doggiesMsg;
const CHAT_ACTION = 'upload_photo';

export default class GoodBoyApi {

	constructor() {

	}

	call(metadata) {
		log(TAG, 'api request');
		const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
		return repo.sendChatAction({ chat_id: metadata.chat_id, action: CHAT_ACTION })
			.then(() => {
				log(TAG, 'good boy api request');
				const breed = metadata.msg ? `breed/${metadata.msg.split(' ').reverse().join('/')}/images` : GOOD_BOY_RANDOM_BREED_TAG;
				return new FetchApi(GOOD_BOY_BASE_URL)
					.fetchData(breed + '/' + GOOD_BOY_ENDPOINT);
			})
			.then(resp => {
				log(TAG, 'api response', resp);
				return resp;
			})
			.then(resp => {
				return repo.sendPhoto({
					chat_id: metadata.chat_id, photo: resp.message,
					caption: GOOD_BOY_CAPTION, reply_to_message_id: metadata.message_id
				});
			})
			.then(resp => {
				log(TAG, 'api success');
				return resp;
			})
			.catch(e => {
				throw new Error('nooo! poor dogies', { cause: e });
			});
	}
}
