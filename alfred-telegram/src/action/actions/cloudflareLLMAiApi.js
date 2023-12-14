import {Ai} from '@cloudflare/ai';
import {chunkString, log, loge, TelegramApi, buildError} from '../../main.mjs';
import {prompts} from '../../res.mjs';

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
		throw buildError(TAG, new Error(`user prompt is empty msg: ${metadata.msg}`));
	}
	const ai = new Ai(metadata.env.AI);
	const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
	return repo.sendChatAction({chat_id: metadata.chat_id, action: CHAT_ACTION})
		.then(() => {
			log(TAG, 'ai request', AI_MODEL, AI_ROLE, metadata.msg);
			return ai.run(AI_MODEL, {
				messages: [
					{role: 'system', content: AI_ROLE},
					{role: 'user', content: metadata.msg}
				]
			});
		}).then(resp => {
			log(TAG, 'ai response', resp);
			const chunks = chunkString(resp.response);
			// Insert ai metadata message before the response
			chunks.unshift(`model: ${AI_MODEL}`);
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
