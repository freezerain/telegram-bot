import { log, loge } from '../main.mjs';


//TODO implement remaining endpoints
//https://core.telegram.org/bots/api#sendaudio
//https://core.telegram.org/bots/api#sendvideo
//https://core.telegram.org/bots/api#sendvoice
//https://core.telegram.org/bots/api#sendlocation

//docs: https://core.telegram.org/bots/api#making-requests
const TAG = 'telegramApi';

export default class TelegramApi {
	constructor(api) {
		this.api = api;
	}

	buildFetch(endpoint, params, fetchMethod = 'POST') {
		const formData = new FormData();
		Object.entries(params).filter(([key, value]) => value !== null && value !== undefined)
			.forEach(([key, value]) => {
				formData.append(key, value);
			});
		const options = {
			method: fetchMethod,
			body: formData
		};
		return this.api.fetchData(endpoint, options)
			.catch(e => {
				loge(TAG, `error fetching telegram`, endpoint, params, e.message);
				throw e;
			});
	}

	//https://core.telegram.org/bots/api#sendmessage
	sendMessage(chat_id, text, disable_notification = null) {
		const endpoint = 'sendMessage';
		const params = {
			chat_id: chat_id,
			text: text,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#forwardmessage
	forwardMessage(chat_id, from_chat_id, message_id, disable_notification = null) {
		const endpoint = 'forwardMessage';
		const params = {
			chat_id: chat_id,
			from_chat_id: from_chat_id,
			message_id: message_id,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#sendphoto
	sendPhoto(chat_id, photo, caption = null, disable_notification = null) {
		const endpoint = 'sendPhoto';
		const params = {
			chat_id: chat_id,
			photo: photo,
			caption: caption,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#senddocument
	sendDocument(chat_id, document, caption = null, disable_notification = null) {
		const endpoint = 'sendDocument';
		const params = {
			chat_id: chat_id,
			document: document,
			caption: caption,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#sendanimation
	sendAnimation(chat_id, animation, caption = null, disable_notification = null) {
		const endpoint = 'sendAnimation';
		const params = {
			chat_id: chat_id,
			animation: animation,
			caption: caption,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#sendmediagroup
	sendMediaGroup(chat_id, media, disable_notification = null) {
		const endpoint = 'sendMediaGroup';
		const params = {
			chat_id: chat_id,
			media: media,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#sendpoll
	sendPoll(chat_id, question, options, is_anonymous = null, type = null, allows_multiple_answers = null,
					 correct_option_id = null, disable_notification = null) {
		const endpoint = 'sendPoll';
		const params = {
			chat_id: chat_id,
			question: question,
			options: options,
			is_anonymous: is_anonymous,
			type: type,
			allows_multiple_answers: allows_multiple_answers,
			correct_option_id: correct_option_id,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#senddice
	//Defaults to “🎲”
	//values 1-6 for “🎲”, “🎯” and “🎳”
	//values 1-5 for “🏀” and “⚽”
	//values 1-64 for “🎰”.
	sendDice(chat_id, emoji = null, disable_notification = null) {
		const endpoint = 'sendDice';
		const params = {
			chat_id: chat_id,
			emoji: emoji,
			disable_notification: disable_notification
		};
		return this.buildFetch(endpoint, params);
	}

	//https://core.telegram.org/bots/api#sendchataction
	//action: typing for text messages
	//upload_photo for photos
	//record_video or upload_video for videos
	//record_voice or upload_voice for voice notes
	//upload_document for general files
	//choose_sticker for stickers
	//find_location for location data
	//record_video_note or upload_video_note for video notes.
	sendChatAction(chat_id, action = 'typing') {
		const endpoint = 'sendChatAction';
		const params = {
			chat_id: chat_id,
			action: action
		};
		return this.buildFetch(endpoint, params);
	}
}