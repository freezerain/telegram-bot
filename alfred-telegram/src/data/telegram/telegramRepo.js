import { Api, TelegramApi } from '../../main.mjs';

const BASE_URL = 'https://api.telegram.org/bot';
const DEFAULT_CHAT_ACTION = 'typing';
// Repository/Service/Facade for telegram api calls
// this layer may be needed for caching and stuff
export default class TelegramRepo {
	constructor(env) {
		this.api = new Api(`${BASE_URL}${env.TELEGRAM_BOT_TOKEN}`);
		this.telegramApi = new TelegramApi(this.api);
	}

	sendMessage(chat_id, text) {
		return this.telegramApi.sendMessage(chat_id, text);
	}

	sendPhoto(chat_id, image, caption = null) {
		return this.telegramApi.sendPhoto(chat_id, image, caption);
	}

	sendDocument(chat_id, document, caption = null) {
		return this.telegramApi.sendDocument(chat_id, document, caption);
	}

	sendAnimation(chat_id, animation, caption = null) {
		return this.telegramApi.sendAnimation(chat_id, animation, caption);
	}

	sendMediaGroup(chat_id, media) {
		return this.telegramApi.sendMediaGroup(chat_id, media);
	}

	sendPoll(chat_id, question, options, is_anonymous = null, type = null,
					 allows_multiple_answers = null, correct_option_id = null) {
		return this.telegramApi.sendPoll(chat_id, question, options, is_anonymous, type,
			allows_multiple_answers, correct_option_id);
	}

	sendDice(chat_id, emoji = null) {
		return this.telegramApi.sendDice(chat_id, emoji);
	}

	sendChatAction(chat_id, action = DEFAULT_CHAT_ACTION) {
		return this.telegramApi.sendChatAction(chat_id, action);
	}
}

