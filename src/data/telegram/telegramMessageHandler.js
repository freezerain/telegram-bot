import {log, loge, getAction} from '#main';

const TAG = 'telegramMessageHandler';
const BOT_ACCOUNT_NAME = '@ratalfred_bot';

export default function handle(update, env) {
	let text = update.message.text?.trim();
	if(!text) throw new Error(`text not found: ${update.message?.text}`);
	//If first word is slash or botName -> remove it
	text = (text.toLowerCase().startsWith(BOT_ACCOUNT_NAME.toLowerCase())) ? text.substring(14).trim() : text;
	text = (text.charAt(0) === '/') ? text.substring(1) : text;

	const words = text.split(' ');
	if (words.length === 0) {
		throw new Error(TAG + 'empty message');
	}

	const metadata = {
		//shortcut fields
		chat_id: update.message.chat.id,
		message_id: update.message.message_id,
		//custom entities
		keyword: words[0].toLowerCase(),
		msg: words.length > 1 ? words.slice(1).join(' ') : '',
		words: words,
		//telegram entities
		message: update.message,
		user: update.message.from,
		update: update,
		env: env
	};

	log(TAG, 'metadata built', `chat_id: ${metadata.chat_id}`,
		`message_id: ${metadata.message_id}`, `keyword: ${metadata.keyword}`,
		`msg: ${metadata.msg}`, `update ↓`, metadata.update);

	const action = getAction(metadata.keyword);
	if (action) {
		return action(metadata);
	} else {
		throw new Error(`action not found: ${metadata.keyword}`);
	}
}
