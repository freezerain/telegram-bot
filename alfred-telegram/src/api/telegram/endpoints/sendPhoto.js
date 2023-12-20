import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function functionsendPhoto(options) {
	const endpoint = 'sendPhoto';
	const params = {
		chat_id: null,
		message_thread_id: null,
		photo: null,
		caption: null,
		parse_mode: DEFAULTS.DEFAULT_PARSE_MODE,
		caption_entities: null,
		has_spoiler: null,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
