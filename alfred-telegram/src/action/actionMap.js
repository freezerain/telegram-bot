import { keywords, strings } from '../res.mjs';
import { TelegramRepo } from '../main.mjs';
import chuckNorrisApi from './actions/chuckNorrisApi.js';
import goodBoyApi from './actions/goodBoyApi.js';
import diceThrow from './actions/diceThrow.js';
import openAiApi from './actions/openAiApi.js';
import cloudflareLLMAiApi from './actions/cloudflareLLMAiApi.js';
import cloudflareSDAiApi from './actions/cloudflareSDAiApi.js';


const FALLBACK_MESSAGE = 'Keyword not found!';
const actionMap = {

	greetings: {
		keywords: keywords.greetings,
		action: (metadata) => {
			return new TelegramRepo(metadata.env).sendMessage(metadata.chat_id, strings.helloMsg);
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
		action: (metadata) => {
			throw new Error('actionMap not implemented');
		}
	},

	epicGamesApi: {
		keywords: keywords.epicGamesApi,
		action: (metadata) => {
			throw new Error('actionMap not implemented');
		}
	},

	chuckNorrisApi: {
		keywords: keywords.chuckNorrisApi,
		action: (metadata) => chuckNorrisApi(metadata)
	},

	testTelegramApiSendAction: {
		keywords: keywords.testTelegramApiSendAction,
		action: (metadata) => {
			return new TelegramRepo(metadata.env).sendChatAction(metadata.chat_id);
		}
	},

	diceThrow: {
		keywords: keywords.diceThrow,
		action: (metadata) => diceThrow(metadata)
	}

};

export const fallbackAction = (metadata) => {
	return new TelegramRepo(metadata.env).sendMessage(metadata.chat_id, FALLBACK_MESSAGE);
};

export default actionMap;
