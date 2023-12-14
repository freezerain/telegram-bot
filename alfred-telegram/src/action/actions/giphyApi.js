import {log, loge, Api, TelegramApi, buildError} from '../../main.mjs';
import {tags} from '../../res.mjs';

const TAG = 'giphyApi';
const GIPHY_API_BASE_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_AGE_RATING = 'r';
const GIPHY_TAGS = tags.giphyTags;
const CHAT_ACTION = 'upload_photo';
const TELEGRAM_CAPTION = '🐀';

export default function call(metadata) {
	const randomTag = GIPHY_TAGS[Math.floor(Math.random() * GIPHY_TAGS.length)];
	log(TAG, 'api request with random tag', randomTag);
	const endpoint = `random?api_key=${metadata.env.GIPHY_API_KEY}&tag=${randomTag.replaceAll(' ', '%20')}&rating=${GIPHY_AGE_RATING}`;
	const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
	return repo.sendChatAction({chat_id: metadata.chat_id, action: CHAT_ACTION})
		.then(() => {
			log(TAG, 'api request');
			return new Api(GIPHY_API_BASE_URL).fetchData(endpoint);
		})
		.then(resp => {
			log(TAG, 'api response', resp);
			return resp.data.images.original.url;
		})
		.then(url => {
			return repo.sendAnimation({
				chat_id: metadata.chat_id,
				animation: url, caption: `${TELEGRAM_CAPTION}${randomTag}`, reply_to_message_id: metadata.message_id
			});
		})
		.then(resp => {
			log(TAG, 'api success');
			return resp;
		})
		.catch(e => {
			throw buildError(TAG, e)
		});
}
