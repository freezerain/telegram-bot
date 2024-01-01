import { log, loge, FetchApi, TelegramApi } from '#main';

const TAG = 'poll';
const POLL_OPTIONS_REGEXP = /(\[.*?\])/;
const CHAT_ACTION = 'typing';

export default class Poll {

	constructor() {

	}

	call(metadata) {
		log(TAG, 'api request');
		const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
		return repo.sendChatAction({ chat_id: metadata.chat_id, action: CHAT_ACTION })
			.then(resp => {
				log(TAG, 'building poll');
				const match = POLL_OPTIONS_REGEXP.exec(metadata.msg);
				const question = metadata.msg.replace(match[0], '').trim();
				const optionList = JSON.stringify(match[0].replaceAll(/[\[\]]/g, '')
					.split(','));
				log(TAG, `question: ${question}`, `options: ${optionList}`);
				return repo.sendPoll({
					chat_id: metadata.chat_id, question: question,
					options: optionList, reply_to_message_id: metadata.message_id
				});
			})
			.then(resp => {
				log(TAG, 'api success');
				return resp;
			})
			.catch(e => {
				throw new Error('api fail', { cause: e });
			});
	}
}

