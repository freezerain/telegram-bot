import OpenAI from 'openai';

import { chunkString, log, loge, TelegramApi, buildError } from '../../main.mjs';
import { prompts } from '../../res.mjs';

// To use function as like in tutorial
//https://developers.cloudflare.com/workers/tutorials/openai-function-calls-workers/

const TAG = 'openAiApi';
const AI_MODEL = 'gpt-3.5-turbo-1106';
const CHAT_GPT4_MODEL = 'gpt-4-1106-preview';
const AI_ROLE = prompts.mainSystem;
const CHAT_ACTION = 'typing';
const AI_GATEWAY = 'https://gateway.ai.cloudflare.com/v1/d070db37359748344dff58e984f42d5a/open-ai/openai';

export default function call(metadata, isGpt4 = false) {
	log(TAG, 'api request');
	if (!metadata.msg) {
		throw buildError(TAG, new Error(`user prompt is empty msg: ${metadata.msg}`));
	}
	return buildCallChain(metadata, isGpt4);
}

function buildCallChain(metadata, isGpt4 = false) {
	log(TAG, 'building call chain');
	const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
	return repo.sendChatAction({chat_id: metadata.chat_id, action: CHAT_ACTION})
		.then(() => {
			return buildAiCall(metadata, isGpt4);
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
					})
				})
			}, Promise.resolve())
		}).then(resp => {
			log(TAG, 'api success', resp);
		}).catch(e => {
			throw buildError(TAG, e)
		});
}

function buildAiCall(metadata, isGpt4 = false) {
	log(TAG, 'building ai call');
	const openai = new OpenAI({
		apiKey: metadata.env.OPENAI_API_KEY,
		baseURL: AI_GATEWAY
	});
	return openai.chat.completions.create({
		model: isGpt4 ? CHAT_GPT4_MODEL : AI_MODEL,
		messages: [{
			'role': 'system',
			'content': AI_ROLE
		},
			{
				'role': 'user',
				'content': metadata.msg
			}]
	});
}
