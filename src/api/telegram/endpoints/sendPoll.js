import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendPoll(options) {
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
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
