import OpenAI from 'openai';

import { chunkString, log, TelegramApi } from '#main';
import { prompts } from '#res';
import { config } from '#res';
// To use function as like in tutorial
//https://developers.cloudflare.com/workers/tutorials/openai-function-calls-workers/

const TAG = 'openAiApi';
const CHAT_GPT_3_5_MODEL = config.chatGptModel;
const CHAT_GPT4_MODEL = config.chatGptAdvancedModel;
const DEFAULT_AI_MODEL = CHAT_GPT_3_5_MODEL;
const DEFAULT_AI_ROLE = prompts.mainSystem;
const CHAT_ACTION = 'typing';
const AI_GATEWAY = config.aiGateway;

export default class OpenAiChatApi {

	constructor({ isGpt4 = false, aiRole = DEFAULT_AI_ROLE } = {}) {
		this.aiModel = isGpt4 ? CHAT_GPT4_MODEL : DEFAULT_AI_MODEL;
		this.aiRole = aiRole;
	}

	call(metadata) {
		log(TAG, 'api request');
		return new Promise((resolve, reject) => {
			if (!metadata.msg) {
				reject(new Error(`user prompt is empty, msg: ${metadata.msg}`));
			}
			resolve(this.buildCallChain(metadata));
		});
	}

	buildCallChain(metadata) {
		log(TAG, 'building call chain');
		const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
		return repo.sendChatAction({ chat_id: metadata.chat_id, action: CHAT_ACTION })
			.then(() => {
				return this.buildAiCall(metadata);
			}).then(resp => {
				log(TAG, 'ai response', resp);
				const chunks = chunkString(resp.choices[0].message.content);
				const responseMetadata = `model: ${resp.model}\n -prompt_tokens: ${resp.usage.prompt_tokens}\n -completion_tokens: ${resp.usage.completion_tokens}\n -total_tokens: ${resp.usage.total_tokens}`;
				// Insert ai metadata message before the response
				chunks.unshift(responseMetadata);
				// Making sure the answer is shorter than telegram message limit
				log(TAG, 'forwarding to telegram', chunks);
				return chunks.reduce((chain, chunk) => {
					return chain.then(() => {
						return repo.sendMessage({
							chat_id: metadata.chat_id, text: chunk,
							reply_to_message_id: metadata.message_id
						});
					});
				}, Promise.resolve());
			}).then(resp => {
				log(TAG, 'api success', resp);
				return resp;
			}).catch(e => {
				throw new Error('api fail', { cause: e });
			});
	}

	buildAiCall(metadata) {
		log(TAG, 'building ai call');
		const openai = new OpenAI({
			apiKey: metadata.env.OPENAI_API_KEY,
			baseURL: AI_GATEWAY
		});
		return openai.chat.completions.create({
			model: this.aiModel,
			messages: [{
				'role': 'system',
				'content': this.aiRole
			},
				{
					'role': 'user',
					'content': metadata.msg
				}]
		});
	}
}
