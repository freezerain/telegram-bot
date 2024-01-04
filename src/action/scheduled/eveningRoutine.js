import { TelegramApi } from '#main';
import EpicGamesApi from '#src/action/actions/epicGamesApi.js';

const subs = [-592463179]

export default function get(metadata) {
	console.log('entering evening routine')

	const epicPromise = (chatId) => new EpicGamesApi().call({
		chat_id: chatId,
		...metadata
	})

	return Promise.all(subs.map(chatId => epicPromise(chatId)))
		.then(r => epicPromise(metadata.env.DEV_CHAT_ID))
}
