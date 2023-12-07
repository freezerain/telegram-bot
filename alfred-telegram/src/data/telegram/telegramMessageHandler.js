import { log, loge, getAction } from '../../main.mjs';

const TAG = 'telegramMessageHandler';
const BOT_ACCOUNT_NAME = '@ratalfred_bot';

export default function handle(update, env) {
	let text = update.message.text.trim();
	//If first word is slash or botName -> remove it
	text = (text.toLowerCase().startsWith(BOT_ACCOUNT_NAME.toLowerCase())) ? text.substring(14).trim() : text;
	text = (text.charAt(0) === '/') ? text.substring(1) : text;

	const words = text.split(' ');
	if (words.length === 0) {
		loge(TAG, ' empty message, no keyword', text);
		throw new Error(TAG + ' empty message, no keyword: ' + text);
	}

	const metadata = {
		chat_id: update.message.chat.id,
		keyword: words[0].toLowerCase(),
		msg: words.length > 1 ? words.slice(1).join(' ') : '',
		words: words,
		env: env
	};

	log(TAG, 'metadata builded', metadata.chat_id, metadata.keyword, metadata.msg, metadata.words);

	const action = getAction(metadata.keyword);
	if (action) {
		return action(metadata);
	} else {
		loge(TAG, 'action not found', metadata.keyword);
		throw new Error(TAG + 'action not found' + metadata.keyword);
	}
}
