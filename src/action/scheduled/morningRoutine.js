import { TelegramApi } from '#main';
import GiphyApi from '#src/action/actions/giphyApi.js';
import {subscribers} from '#res'

// add here all chat ids where you want to receive this routine
const subs = subscribers.morningSubs

export default function get(metadata) {
	console.log('entering mourning routine')

	const giphyPromise = (chatId) => new GiphyApi().call({
		...metadata,
		chat_id: chatId
	})

	return Promise.all(subs.map(chatId => giphyPromise(chatId)))
}
