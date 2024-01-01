import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendMediaGroup(options) {
	const endpoint = 'sendMediaGroup';
	const params = {
		chat_id: null,
		message_thread_id: null,
		media: null,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		...options
	};
	return { endpoint, params };
}
