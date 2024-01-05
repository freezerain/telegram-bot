import { TelegramApi } from '#main';
import EpicGamesApi from '#src/action/actions/epicGamesApi.js';
import {subscribers} from '#res'

// add here all chat ids where you want to receive this routine
const subs = subscribers.eveningSubs
export default function get(metadata) {
	console.log('entering evening routine')

	const epicPromise = (chatId) => new EpicGamesApi().call({
		...metadata,
		chat_id: chatId
	})

	return Promise.all(subs.map(chatId => epicPromise(chatId)))
}
