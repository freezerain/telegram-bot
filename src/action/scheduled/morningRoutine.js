import { TelegramApi } from '#main';
import GiphyApi from '#src/action/actions/giphyApi.js';

const subs = [-592463179]

export default function get(metadata) {
	console.log('entering mourning routine')

	const giphyPromise = (chatId) => new GiphyApi().call({
		...metadata,
		chat_id: chatId
	})

	return Promise.all(subs.map(chatId => giphyPromise(chatId)))
		//.then((r) => giphyPromise(metadata.env.DEV_CHAT_ID))
}
