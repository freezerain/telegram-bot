import {Api, log, loge, buildError} from '../main.mjs';


//docs: https://core.telegram.org/bots/api#making-requests
const TAG = 'telegramApi';
const BASE_URL = 'https://api.telegram.org/bot';
const DEFAULT_CHAT_ACTION = 'typing'
const DEFAULT_EMOJI = '🎲';
const DEFAULT_DISABLE_NOTIFICATION = true;
const DEFAULT_PARSE_MODE = null//'MarkdownV2';
export default class TelegramApi {
	//secrets: TELEGRAM_BOT_TOKEN
	constructor(token) {
		this.api = new Api(`${BASE_URL}${token}`);
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
				throw buildError(TAG, e, `Fetch telegram ${endpoint} failed`)
			});
	}

	/**
	 * Sends a text message.
	 * @url: https://core.telegram.org/bots/api#sendmessage
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel.
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {string} options.text - Text of the message to be sent, 1-4096 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the message text. See formatting options for more details.
	 * @param {Array} [options.entities = null] - A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode.
	 * @param {boolean} [options.disable_web_page_preview = null] - Disables link previews for links in this message.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendMessage(options) {
		const endpoint = 'sendMessage';
		const params = {
			chat_id: null,
			message_thread_id: null,
			text: null,
			parse_mode: DEFAULT_PARSE_MODE,
			entities: null,
			disable_web_page_preview: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Forwards a message.
	 * @url: https://core.telegram.org/bots/api#forwardmessage
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {number|string} options.from_chat_id - Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername).
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the forwarded message from forwarding and saving.
	 * @param {number} options.message_id - Message identifier in the chat specified in from_chat_id.
	 * @returns {Promise<Object>} - A Promise that resolves with the forwarded message on success.
	 */
	forwardMessage(options) {
		const endpoint = 'forwardMessage';
		const params = {
			chat_id: null,
			message_thread_id: null,
			from_chat_id: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			message_id: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a photo.
	 * @url: https://core.telegram.org/bots/api#sendphoto
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.photo - Photo to send. Pass a file_id as a String to send a photo that exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data.
	 * @param {string} [options.caption = null] - Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the photo caption. See formatting options for more details.
	 * @param {Array} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {boolean} [options.has_spoiler = null] - Pass True if the photo needs to be covered with a spoiler animation.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendPhoto(options) {
		const endpoint = 'sendPhoto';
		const params = {
			chat_id: null,
			message_thread_id: null,
			photo: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			has_spoiler: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a document.
	 * @url: https://core.telegram.org/bots/api#senddocument
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.document - File to send. Pass a file_id as a String to send a file that exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
	 * @param {InputFile|string} [options.thumbnail = null] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data.
	 * @param {string} [options.caption = null] - Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the document caption. See formatting options for more details.
	 * @param {Array} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {boolean} [options.disable_content_type_detection = null] - Disables automatic server-side content type detection for files uploaded using multipart/form-data.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendDocument(options) {
		const endpoint = 'sendDocument';
		const params = {
			chat_id: null,
			message_thread_id: null,
			document: null,
			thumbnail: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			disable_content_type_detection: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends an animation.
	 * @url: https://core.telegram.org/bots/api#sendanimation
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.animation - Animation to send. Pass a file_id as a String to send an animation that exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data.
	 * @param {number} [options.duration = null] - Duration of sent animation in seconds.
	 * @param {number} [options.width = null] - Animation width.
	 * @param {number} [options.height = null] - Animation height.
	 * @param {InputFile|string} [options.thumbnail = null] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * @param {string} [options.caption = null] - Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the animation caption. See formatting options for more details.
	 * @param {Array} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {boolean} [options.has_spoiler = null] - Pass True if the animation needs to be covered with a spoiler animation.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendAnimation(options) {
		const endpoint = 'sendAnimation';
		const params = {
			chat_id: null,
			message_thread_id: null,
			animation: null,
			duration: null,
			width: null,
			height: null,
			thumbnail: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			has_spoiler: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}


	/**
	 * Sends a media group (album).
	 * @url: https://core.telegram.org/bots/api#sendmediagroup
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {Array} options.media - A JSON-serialized array describing messages to be sent, must include 2-10 items of type InputMediaAudio, InputMediaDocument, InputMediaPhoto, and InputMediaVideo.
	 * @param {boolean} [options.disable_notification = null] - Sends messages silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent messages from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the messages are a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @returns {Promise<Array>} - A Promise that resolves with an array of Messages that were sent on success.
	 */
	sendMediaGroup(options) {
		const endpoint = 'sendMediaGroup';
		const params = {
			chat_id: null,
			message_thread_id: null,
			media: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a native poll.
	 * @url: https://core.telegram.org/bots/api#sendpoll
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {string} options.question - Poll question, 1-300 characters.
	 * @param {Array} options.options - A JSON-serialized list of answer options, 2-10 strings 1-100 characters each.
	 * @param {boolean} [options.is_anonymous = true] - True, if the poll needs to be anonymous, defaults to True.
	 * @param {string} [options.type = 'regular'] - Poll type, “quiz” or “regular”, defaults to “regular”.
	 * @param {boolean} [options.allows_multiple_answers = false] - True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False.
	 * @param {number} [options.correct_option_id = null] - 0-based identifier of the correct answer option, required for polls in quiz mode.
	 * @param {string} [options.explanation = null] - Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing.
	 * @param {string} [options.explanation_parse_mode = null] - Mode for parsing entities in the explanation. See formatting options for more details.
	 * @param {Array} [options.explanation_entities = null] - A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of parse_mode.
	 * @param {number} [options.open_period = null] - Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
	 * @param {number} [options.close_date = null] - Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period.
	 * @param {boolean} [options.is_closed = false] - Pass True if the poll needs to be immediately closed. This can be useful for poll preview.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendPoll(options) {
		const endpoint = 'sendPoll';
		const params = {
			chat_id: null,
			message_thread_id: null,
			question: null,
			options: null,
			is_anonymous: null,
			type: null,
			allows_multiple_answers: null,
			correct_option_id: null,
			explanation: null,
			explanation_parse_mode: null,
			explanation_entities: null,
			open_period: null,
			close_date: null,
			is_closed: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends an animated emoji with a random value (dice).
	 * @url: https://core.telegram.org/bots/api#senddice
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} options.message_thread_id - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {string} [options.emoji = '🎲'] - Emoji on which the dice throw animation is based. Currently, must be one of
	 * “🎲 🎯 🎳” for 1-6, “🏀 ⚽” for 1-5, or “🎰” for 1-64. Defaults to “🎲”.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {Object} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent message on success.
	 */
	sendDice(options) {
		const endpoint = 'sendDice';
		const params = {
			chat_id: null,
			message_thread_id: null,
			emoji: DEFAULT_EMOJI,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a chat action to notify the user that something is happening on the bot's side.
	 * @url: https://core.telegram.org/bots/api#sendchataction
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread; supergroups only.
	 * @param {string} options.action - Type of action to broadcast. Choose one, depending on what the user is about to receive:
	 * typing for text messages,
	 * upload_photo for photos,
	 * record_video or upload_video for videos,
	 * record_voice or upload_voice for voice notes,
	 * upload_document for general files,
	 * choose_sticker for stickers,
	 * find_location for location data,
	 * record_video_note or upload_video_note for video notes.
	 * @returns {Promise<boolean>} - A Promise that resolves with `true` on success.
	 */
	sendChatAction(options) {
		const endpoint = 'sendChatAction';
		const params = {
			chat_id: null,
			message_thread_id: null,
			action: DEFAULT_CHAT_ACTION,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends an audio file to the specified chat.
	 * @url: https://core.telegram.org/bots/api#sendaudio
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.audio - Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files »
	 * @param {string} [options.caption = null] - Audio caption, 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the audio caption. See formatting options for more details.
	 * @param {Array<MessageEntity>} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {number} [options.duration = null] - Duration of the audio in seconds.
	 * @param {string} [options.performer = null] - Performer.
	 * @param {string} [options.title = null] - Track name.
	 * @param {InputFile|string} [options.thumbnail = null] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent Message on success.
	 */
	sendAudio(options) {
		const endpoint = 'sendAudio';
		const params = {
			chat_id: null,
			message_thread_id: null,
			audio: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			duration: null,
			performer: null,
			title: null,
			thumbnail: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a video file to the specified chat.
	 * @url: https://core.telegram.org/bots/api#sendvideo
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.video - Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More information on Sending Files »
	 * @param {number} [options.duration = null] - Duration of the sent video in seconds.
	 * @param {number} [options.width = null] - Video width.
	 * @param {number} [options.height = null] - Video height.
	 * @param {InputFile|string} [options.thumbnail = null] - Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * @param {string} [options.caption = null] - Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the video caption. See formatting options for more details.
	 * @param {Array<MessageEntity>} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {boolean} [options.has_spoiler = null] - Pass True if the video needs to be covered with a spoiler animation.
	 * @param {boolean} [options.supports_streaming = null] - Pass True if the uploaded video is suitable for streaming.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent Message on success.
	 */
	sendVideo(options) {
		const endpoint = 'sendVideo';
		const params = {
			chat_id: null,
			message_thread_id: null,
			video: null,
			duration: null,
			width: null,
			height: null,
			thumbnail: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			has_spoiler: null,
			supports_streaming: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a voice message to the specified chat.
	 * @url: https://core.telegram.org/bots/api#sendvoice
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {InputFile|string} options.voice - Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files »
	 * @param {string} [options.caption = null] - Voice message caption, 0-1024 characters after entities parsing.
	 * @param {string} [options.parse_mode = null] - Mode for parsing entities in the voice message caption. See formatting options for more details.
	 * @param {Array<MessageEntity>} [options.caption_entities = null] - A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode.
	 * @param {number} [options.duration = null] - Duration of the voice message in seconds.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent Message on success.
	 */
	sendVoice(options) {
		const endpoint = 'sendVoice';
		const params = {
			chat_id: null,
			message_thread_id: null,
			voice: null,
			caption: null,
			parse_mode: DEFAULT_PARSE_MODE,
			caption_entities: null,
			duration: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

	/**
	 * Sends a location on the map.
	 * @url: https://core.telegram.org/bots/api#sendlocation
	 * @param {Object} options - The options object.
	 * @param {number|string} options.chat_id - Unique identifier for the target chat or username of the target channel (in the format @channelusername).
	 * @param {number} [options.message_thread_id = null] - Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
	 * @param {number} options.latitude - Latitude of the location.
	 * @param {number} options.longitude - Longitude of the location.
	 * @param {number} [options.horizontal_accuracy = null] - The radius of uncertainty for the location, measured in meters; 0-1500.
	 * @param {number} [options.live_period = null] - Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400).
	 * @param {number} [options.heading = null] - For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
	 * @param {number} [options.proximity_alert_radius = null] - For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
	 * @param {boolean} [options.disable_notification = null] - Sends the message silently. Users will receive a notification with no sound.
	 * @param {boolean} [options.protect_content = null] - Protects the contents of the sent message from forwarding and saving.
	 * @param {number} [options.reply_to_message_id = null] - If the message is a reply, ID of the original message.
	 * @param {boolean} [options.allow_sending_without_reply = null] - Pass True if the message should be sent even if the specified replied-to message is not found.
	 * @param {InlineKeyboardMarkup|ReplyKeyboardMarkup|ReplyKeyboardRemove|ForceReply} [options.reply_markup = null] - Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard, or to force a reply from the user.
	 * @returns {Promise<Object>} - A Promise that resolves with the sent Message on success.
	 */
	sendLocation(options) {
		const endpoint = 'sendLocation';
		const params = {
			chat_id: null,
			message_thread_id: null,
			latitude: null,
			longitude: null,
			horizontal_accuracy: null,
			live_period: null,
			heading: null,
			proximity_alert_radius: null,
			disable_notification: DEFAULT_DISABLE_NOTIFICATION,
			protect_content: null,
			reply_to_message_id: null,
			allow_sending_without_reply: null,
			reply_markup: null,
			...options
		};
		return this.buildFetch(endpoint, params);
	}

}
