import { keywords, strings } from '../res.mjs';
import { TelegramApi } from '../main.mjs';
import ChuckNorrisApi from './actions/chuckNorrisApi.js';
import GoodBoyApi from './actions/goodBoyApi.js';
import DiceThrow from './actions/diceThrow.js';
import OpenAiChatApi from './actions/openAiChatApi.js';
import cloudflareLLMAiApi from './actions/cloudflareLLMAiApi.js';
import cloudflareSDAiApi from './actions/cloudflareSDAiApi.js';
import GiphyApi from './actions/giphyApi.js';
import EpicGamesApi from './actions/epicGamesApi.js';
import Poll from './actions/poll.js';
import testAction from './actions/testAction.js';


const FALLBACK_MESSAGE = 'Keyword not found!';
export default {

	greetings: {
		keywords: keywords.greetings,
		action: (metadata) => {
			return new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN)
				.sendMessage({ chat_id: metadata.chat_id, text: strings.helloMsg, reply_to_message_id: metadata.message_id });
		}
	},

	ai: {
		keywords: keywords.ai,
		action: (metadata) => new OpenAiChatApi().call(metadata)
	},

	cloudflareLLMAiApi: {
		keywords: keywords.cloudflareLLMAiApi,
		action: (metadata) => cloudflareLLMAiApi(metadata)
	},

	openAiApi: {
		keywords: keywords.openAiApi,
		action: (metadata) => new OpenAiChatApi().call(metadata)
	},

	openAiApiGPT4: {
		keywords: keywords.openAiApiGPT4,
		action: (metadata) => new OpenAiChatApi().call(metadata, { isGpt4: true })
	},

	cloudflareSDAiApi: {
		keywords: keywords.cloudflareSDAiApi,
		action: (metadata) => cloudflareSDAiApi(metadata)
	},

	goodBoyApi: {
		keywords: keywords.goodBoyApi,
		action: (metadata) => new GoodBoyApi().call(metadata)
	},

	poll: {
		keywords: keywords.poll,
		action: (metadata) => new Poll().call(metadata)
	},

	giphyApi: {
		keywords: keywords.giphyApi,
		action: (metadata) => new GiphyApi().call(metadata)
	},

	epicGamesApi: {
		keywords: keywords.epicGamesApi,
		action: (metadata) => new EpicGamesApi().call(metadata)
	},

	chuckNorrisApi: {
		keywords: keywords.chuckNorrisApi,
		action: (metadata) => new ChuckNorrisApi().call(metadata)
	},

	diceThrow: {
		keywords: keywords.diceThrow,
		action: (metadata) => new DiceThrow().call(metadata)
	},

	test: {
		keywords: keywords.test,
		action: (metadata) => {
			return testAction(metadata);
		}
	}
};

export const fallbackAction = (metadata) => {
	return new Promise((resolve, reject) => {
		console.log(FALLBACK_MESSAGE);
		resolve(FALLBACK_MESSAGE);
	});
};
