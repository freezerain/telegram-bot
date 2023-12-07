import { Ai } from '@cloudflare/ai';
import { log, loge, TelegramRepo } from '../../main.mjs';

// TODO Cloudflare timeout, maybe bug on their side
// review feature later
// this is not working for the moment
const TAG = 'cloudflareSDAiApi';
const AI_MODEL = '@cf/stabilityai/stable-diffusion-xl-base-1.0';
const AI_STEPS = 20
const CHAT_ACTION = 'upload_photo';

export default function call(metadata) {
	log(TAG, 'api request');
	if (!metadata.msg) {
		loge(TAG, 'userPrompt was empty, throwing exception');
		throw new Error(TAG + ' error - user prompt is empty: ' + metadata?.msg);
	}
	const ai = new Ai(metadata.env.AI);
	//returns binary string
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION)
		.then(() => {
			log(TAG, 'ai request');
			return ai.run(AI_MODEL, { // <-- Timeout on this line!
				prompt: metadata.msg,
				num_steps: AI_STEPS
			});
		}).then(resp => {
			// dont log binary file, cloudflare logger is crashing lol
			//log('cloudflareSDAiApi response', resp)
			log(TAG, 'creating blob file');
			const blob = new Blob([resp], { type: 'image/png' });
			// suggested faster way to parse the image
			//const binaryData = Buffer.from(resp, 'binary');
			log(TAG, 'forwarding to telegram');
			return repo.sendPhoto(metadata.chat_id, blob);
		}).then(resp => {
			log(TAG, 'api success', resp);
		})
		.catch(e => {
			loge(TAG, 'api error', e.message);
			throw e
		});
}
