import OpenAI from 'openai';

import { chunkString, log, loge, TelegramRepo } from '../../main.mjs';
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
		loge(TAG, 'userPrompt was empty, throwing exception');
		throw new Error(TAG + ' error - user prompt is empty: ' + metadata?.msg);
	}
	return buildCallChain(metadata, isGpt4);
}

function buildCallChain(metadata, isGpt4 = false) {
	log(TAG, 'buildin call chain');
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION)
		.then(() => {
			return buildAiCall(metadata, isGpt4);
		}).then(resp => {
			log(TAG, 'ai response', resp);
			const chunks = chunkString(resp.choices[0].message.content);
			const responseMetadata = `model: ${resp.model}\n -prompt_tokens: ${resp.usage.prompt_tokens}\n -completion_tokens: ${resp.usage.completion_tokens}\n -total_tokens: ${resp.usage.total_tokens}`;
			// Insert metadata message before the response
			chunks.unshift(responseMetadata);
			// Making sure the asnwer is shorter then telegram message limit
			log(TAG, 'forwarding to telegram', chunks);
			return chunks.reduce((chain, chunk) => {
				return chain.then(() => repo.sendMessage(metadata.chat_id, chunk));
			}, Promise.resolve());
		}).then(resp => {
			log(TAG, 'api success', resp);
		}).catch(e => {
			loge(TAG, 'api error', e.message);
			throw e;
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