import { Ai } from '@cloudflare/ai';
import { chunkString, log, loge, TelegramRepo } from '../../main.mjs';
import { prompts } from '../../res.mjs';

//	npm update @cloudflare/ai --save-dev
// 	available models:
//	@cf/mistral/mistral-7b-instruct-v0.1
//	@cf/meta/llama-2-7b-chat-int8
//	@cf/meta/llama-2-7b-chat-fp16

const TAG = 'cloudflareLLMAiApi';
const AI_MODEL = '@cf/meta/llama-2-7b-chat-fp16';
const AI_ROLE = prompts.mainSystem;
const CHAT_ACTION = 'typing';

export default function call(metadata) {
	log(TAG, 'api request');
	if (!metadata.msg) {
		loge(TAG, 'userPrompt was empty, throwing exception');
		throw new Error(TAG + ' error - user prompt is empty: ' + metadata?.msg);
	}
	const ai = new Ai(metadata.env.AI);
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION)
		.then(() => {
			log(TAG, 'ai request', AI_MODEL, AI_ROLE, metadata.msg);
			return ai.run(AI_MODEL, {
				messages: [
					{ role: 'system', content: AI_ROLE },
					{ role: 'user', content: metadata.msg }
				]
			});
		}).then(resp => {
			log(TAG, 'ai response', resp);
			const chunks = chunkString(resp.response);
			// Insert metadata message before the response
			chunks.unshift(`model: ${AI_MODEL}`);
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