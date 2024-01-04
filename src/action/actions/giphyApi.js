import { log, FetchApi, TelegramApi } from '#main';
import { tags } from '#res';

const TAG = 'giphyApi';
const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const DEFAULT_GIPHY_AGE_RATING = 'r';
const DEFAULT_GIPHY_TAGS = tags.giphyTags;
const CHAT_ACTION = 'upload_photo';
const TELEGRAM_CAPTION = '🐀';

export default class GiphyApi {
	constructor({ tags = DEFAULT_GIPHY_TAGS, rating = DEFAULT_GIPHY_AGE_RATING } = {}) {
		this.tags = tags;
		this.rating = rating;
	}

	getRandomTag() {
		return this.tags[Math.floor(Math.random() * this.tags.length)];
	}

	call(metadata) {
		log(TAG, 'api request');
		let randomTag = metadata?.msg ? metadata.msg : this.getRandomTag();
		log(TAG, 'random tag selected', randomTag);
		const endpoint = `random?api_key=${metadata.env.GIPHY_API_KEY}&tag=${randomTag.replaceAll(' ', '%20')}&rating=${this.rating}`;
		const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
		return repo.sendChatAction({ chat_id: metadata.chat_id, action: CHAT_ACTION })
			.then(() => {
				log(TAG, 'api request');
				return new FetchApi(GIPHY_API_BASE_URL).fetchData(endpoint);
			})
			.then(resp => {
				log(TAG, 'api response', resp);
				return resp.data.images.original.url;
			})
			.then(url => {
				return repo.sendAnimation({
					chat_id: metadata.chat_id,
					animation: url, caption: `${TELEGRAM_CAPTION} ${randomTag}`, reply_to_message_id: metadata?.message_id
				});
			})
			.then(resp => {
				log(TAG, 'api success');
				return resp;
			})
			.catch(e => {
				throw new Error('api fail', { cause: e });
			});
	}
}
