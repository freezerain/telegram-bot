import {log, loge, TelegramApi, buildError} from '../../main.mjs';

//Defaults to “🎲”
//values 1-6 for “🎲”, “🎯” and “🎳”
//values 1-5 for “🏀” and “⚽”
//values 1-64 for “🎰”.
// Telegram bug: not working in WEB app
const TAG = 'diceThrow';
const CHAT_ACTION = 'choose_sticker';

export default function call(metadata) {
	log(TAG, 'api request');
	const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
	return repo.sendChatAction({chat_id: metadata.chat_id, action: CHAT_ACTION})
		.then(() => {
			//Show users all options
			const msg = '🏀⚽🎲🎯🎳🎰';
			return repo.sendMessage({
				chat_id: metadata.chat_id, text: msg,
				reply_to_message_id: metadata.message_id
			});
		})
		.then(() => {
			return repo.sendDice({
				chat_id: metadata.chat_id, emoji: metadata.msg,
				reply_to_message_id: metadata.message_id
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
