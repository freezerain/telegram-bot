import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendVoice(options) {
	const endpoint = 'sendVoice';
	const params = {
		chat_id: null,
		message_thread_id: null,
		voice: null,
		caption: null,
		parse_mode: DEFAULTS.DEFAULT_PARSE_MODE,
		caption_entities: null,
		duration: null,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
