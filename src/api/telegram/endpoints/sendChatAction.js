import * as DEFAULTS from '../endpointDefaults.js';

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
 * @returns {Object} - Object with endpoint and params to use
 */
export default function sendChatAction(options) {
	const endpoint = 'sendChatAction';
	const params = {
		chat_id: null,
		message_thread_id: null,
		action: DEFAULTS.DEFAULT_CHAT_ACTION,
		...options
	};
	return { endpoint, params };
}
