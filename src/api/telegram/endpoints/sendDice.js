import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendDice(options) {
	const endpoint = 'sendDice';
	const params = {
		chat_id: null,
		message_thread_id: null,
		emoji: DEFAULTS.DEFAULT_EMOJI,
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
