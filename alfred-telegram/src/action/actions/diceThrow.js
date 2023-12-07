import { log, loge, TelegramRepo } from '../../main.mjs';

//Defaults to “🎲”
//values 1-6 for “🎲”, “🎯” and “🎳”
//values 1-5 for “🏀” and “⚽”
//values 1-64 for “🎰”.
// Telegram bug: not working in WEB app
const TAG = 'diceThrow';
const CHAT_ACTION = 'choose_sticker';

export default function call(metadata) {
	log(TAG, 'api request');
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION)
		.then(() => {
			//Show users all options
			const msg = '🏀⚽🎲🎯🎳🎰';
			return repo.sendMessage(metadata.chat_id, msg);
		})
		.then(() => {
			return repo.sendDice(metadata.chat_id, metadata.msg);
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