import { Ai } from '@cloudflare/ai';
import { log, loge, chunkString, TelegramRepo } from '../../main.mjs';
import { mainSystem } from '../../res.mjs';
//	npm update @cloudflare/ai --save-dev
// 	available models:
//	@cf/mistral/mistral-7b-instruct-v0.1
//	@cf/meta/llama-2-7b-chat-int8
//	@cf/meta/llama-2-7b-chat-fp16
const aiRole = mainSystem;

export default function call(metadata) {
	log('cloudflareLLMAiApi call');
	if (!metadata.msg) {
		throw new Error('cloudflareLLMAiApi user prompt is empty', metadata?.msg);
	}
	const ai = new Ai(metadata.env.AI);
	const aiModel = '@cf/meta/llama-2-7b-chat-fp16';
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, 'typing')
		.then(resp => {
			return ai.run(aiModel, {
				messages: [
					{ role: 'system', content: aiRole },
					{ role: 'user', content: metadata.msg }
				]
			});
		}).then(resp => {
			log('cloudflareLLMAiApi response', resp);
			const chunks = chunkString(resp.response);
			chunks.unshift(`model: ${aiModel}`);
			const telegramFetchChain = chunks.reduce((chain, chunk) => {
				return chain.then(() => repo.sendMessage(metadata.chat_id, chunk));
			}, Promise.resolve());
			return telegramFetchChain;
		}).then(resp => {
			log('cloudflareLLMAiApi success', resp);
		}).catch(e => {
			loge('cloudflareLLMAiApi error', e.message);
			throw e;
		});
}
