import { log, loge, Api, TelegramRepo } from '../../main.mjs';
import { tags } from '../../res.mjs';

const TAG = 'giphyApi';
const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_AGE_RATING = 'r';
const GIPHY_TAGS = tags.giphyTags;
const CHAT_ACTION = 'upload_photo';
const TELEGRAM_CAPTION = '🐀';

export default function call(metadata) {
	log(TAG, 'api build');
	const randomTag = GIPHY_TAGS[Math.floor(Math.random() * GIPHY_TAGS.length)];
	log(TAG, 'random tag', randomTag);
	const endpoint = `random?api_key=${metadata.env.GIPHY_API_KEY}&tag=${randomTag.replace(' ', '%20')}&rating=${GIPHY_AGE_RATING}`;
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION).then(() => {
		log(TAG, 'api request', endpoint);
		return new Api(GIPHY_API_BASE_URL).fetchData(endpoint);
	})
		.then(resp => {
			log(TAG, 'api response', resp);
			return resp.data.images.original.url;
		})
		.then(url => {
			return repo.sendAnimation(metadata.chat_id, url, `${TELEGRAM_CAPTION}${randomTag}`);
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