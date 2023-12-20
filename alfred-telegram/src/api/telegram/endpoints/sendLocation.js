import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendLocation(options) {
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
		disable_notification: DEFAULTS.DEFAULT_DISABLE_NOTIFICATION,
		protect_content: null,
		reply_to_message_id: null,
		allow_sending_without_reply: null,
		reply_markup: null,
		...options
	};
	return { endpoint, params };
}
