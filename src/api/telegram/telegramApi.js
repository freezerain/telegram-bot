import { FetchApi, log, loge, buildError } from '../../main.mjs';
import endpoints from './endpoints/index.mjs';
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
		const { endpoint, params } = endpoints.sendMessage(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	forwardMessage(options) {
		const { endpoint, params } = endpoints.forwardMessage(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendPhoto(options) {
		const { endpoint, params } = endpoints.sendPhoto(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendDocument(options) {
		const { endpoint, params } = endpoints.sendDocument(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendAnimation(options) {
		const { endpoint, params } = endpoints.sendAnimation(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendMediaGroup(options) {
		const { endpoint, params } = endpoints.sendMediaGroup(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendPoll(options) {
		const { endpoint, params } = endpoints.sendPoll(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendDice(options) {
		const { endpoint, params } = endpoints.sendDice(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendChatAction(options) {
		const { endpoint, params } = endpoints.sendChatAction(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendAudio(options) {
		const { endpoint, params } = endpoints.sendAudio(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendVideo(options) {
		const { endpoint, params } = endpoints.sendVideo(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendVoice(options) {
		const { endpoint, params } = endpoints.sendVoice(options);
		return this.fetchBuilder.build(endpoint, params);
	}

	sendLocation(options) {
		const { endpoint, params } = endpoints.sendLocation(options);
		return this.fetchBuilder.build(endpoint, params);
	}

}
