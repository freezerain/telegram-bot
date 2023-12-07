import { log, loge, Api, TelegramRepo } from '../../main.mjs';
//Defaults to “🎲”
//values 1-6 for “🎲”, “🎯” and “🎳”
//values 1-5 for “🏀” and “⚽”
//values 1-64 for “🎰”.
export default function call(metadata) {
	log('diceThrow call');
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, 'choose_sticker')
		.then(resp => {
			const msg = '🏀⚽🎲🎯🎳🎰';
			return repo.sendMessage(metadata.chat_id, msg);
		})
		.then(resp => {
			return repo.sendDice(metadata.chat_id, metadata.msg);
		})
		.then(resp => {
			log('diceThrow success');
			return resp;
		})
		.catch(e => {
			loge('diceThrow error', e.message);
			throw e;
		});
}
