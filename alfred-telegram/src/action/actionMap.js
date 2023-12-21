import {keywords, strings} from '../res.mjs';
import {TelegramApi} from '../main.mjs';
import chuckNorrisApi from './actions/chuckNorrisApi.js';
import goodBoyApi from './actions/goodBoyApi.js';
import diceThrow from './actions/diceThrow.js';
import openAiApi from './actions/openAiApi.js';
import cloudflareLLMAiApi from './actions/cloudflareLLMAiApi.js';
import cloudflareSDAiApi from './actions/cloudflareSDAiApi.js';
import giphyApi from './actions/giphyApi.js';
import epicGamesApi from './actions/epicGamesApi.js';


const FALLBACK_MESSAGE = 'Keyword not found!';
const actionMap = {

	greetings: {
		keywords: keywords.greetings,
		action: (metadata) => {
			return new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN)
				.sendMessage({chat_id: metadata.chat_id, text: strings.helloMsg, reply_to_message_id: metadata.message_id});
		}
	},

	ai: {
		keywords: keywords.ai,
		action: (metadata) => openAiApi(metadata)
	},

	cloudflareLLMAiApi: {
		keywords: keywords.cloudflareLLMAiApi,
		action: (metadata) => cloudflareLLMAiApi(metadata)
	},

	openAiApi: {
		keywords: keywords.openAiApi,
		action: (metadata) => openAiApi(metadata)
	},

	openAiApiGPT4: {
		keywords: keywords.openAiApiGPT4,
		action: (metadata) => openAiApi(metadata, true)
	},

	cloudflareSDAiApi: {
		keywords: keywords.cloudflareSDAiApi,
		action: (metadata) => cloudflareSDAiApi(metadata)
	},

	goodBoyApi: {
		keywords: keywords.goodBoyApi,
		action: (metadata) => goodBoyApi(metadata)
	},

	poll: {
		keywords: keywords.poll,
		action: (metadata) => {
			throw new Error('actionMap not implemented');
		}
	},

	giphyApi: {
		keywords: keywords.giphyApi,
		action: (metadata) => giphyApi(metadata)
	},

	epicGamesApi: {
		keywords: keywords.epicGamesApi,
		action: (metadata) => epicGamesApi(metadata)
	},

	chuckNorrisApi: {
		keywords: keywords.chuckNorrisApi,
		action: (metadata) => chuckNorrisApi(metadata)
	},

	testTelegramApiSendAction: {
		keywords: keywords.testTelegramApiSendAction,
		action: (metadata) => {
			return new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN)
				.sendChatAction({chat_id: metadata.chat_id});
		}
	},

	diceThrow: {
		keywords: keywords.diceThrow,
		action: (metadata) => diceThrow(metadata)
	}

};

export const fallbackAction = (metadata) => {
	return new Promise((resolve, reject) => {
		console.log(FALLBACK_MESSAGE);
		resolve(FALLBACK_MESSAGE)
	})
};

export default actionMap;
