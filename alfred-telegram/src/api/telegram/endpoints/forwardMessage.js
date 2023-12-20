import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function forwardMessage(options) {
	const endpoint = 'forwardMessage';
	const params = {
		chat_id: null,
		message_thread_id: null,
		from_chat_id: null,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		message_id: null,
		...options
	};
	return { endpoint, params };
}
