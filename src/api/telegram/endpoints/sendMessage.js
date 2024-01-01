import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */


export default function sendMessage(options) {
	const endpoint = 'sendMessage';
	const params = {
		chat_id: null,
		message_thread_id: null,
		text: null,
		parse_mode: DEFAULTS.DEFAULT_PARSE_MODE,
		entities: null,
		disable_web_page_preview: null,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
