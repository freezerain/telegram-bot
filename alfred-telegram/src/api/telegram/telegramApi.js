import { FetchApi, log, loge, buildError } from '../../main.mjs';
import * as endpoints from './endpoints/index.mjs';
import FetchBuilder from './fetchBuilder.js';

//docs: https://core.telegram.org/bots/api#making-requests
const TAG = 'telegramApi';
const BASE_URL = 'https://api.telegram.org/bot';
export default class TelegramApi {
	//secrets: TELEGRAM_BOT_TOKEN
	constructor(token) {
		this.api = new FetchApi(`${BASE_URL}${token}`);
		this.fetchBuilder = new FetchBuilder(this.api);
	}

	sendMessage(options) {
		return this.fetchBuilder.build(...endpoints.sendMessage(options));
	}

	forwardMessage(options) {
		return this.fetchBuilder.build(...endpoints.forwardMessage(options));
	}

	sendPhoto(options) {
		return this.fetchBuilder.build(...endpoints.sendPhoto(options));
	}

	sendDocument(options) {
		return this.fetchBuilder.build(...endpoints.sendDocument(options));
	}

	sendAnimation(options) {
		return this.fetchBuilder.build(...endpoints.sendAnimation(options));
	}

	sendMediaGroup(options) {
		return this.fetchBuilder.build(...endpoints.sendMediaGroup(options));
	}

	sendPoll(options) {
		return this.fetchBuilder.build(...endpoints.sendPoll(options));
	}

	sendDice(options) {
		return this.fetchBuilder.build(...endpoints.sendDice(options));
	}

	sendChatAction(options) {
		return this.fetchBuilder.build(...endpoints.sendChatAction(options));
	}

	sendAudio(options) {
		return this.fetchBuilder.build(...endpoints.sendAudio(options));
	}


	sendVideo(options) {
		return this.fetchBuilder.build(...endpoints.sendVideo(options));
	}

	sendVoice(options) {
		return this.fetchBuilder.build(...endpoints.sendVoice(options));
	}

	sendLocation(options) {
		return this.fetchBuilder.build(...endpoints.sendLocation(options));
	}

}
