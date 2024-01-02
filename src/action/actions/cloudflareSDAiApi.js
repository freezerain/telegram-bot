//import {Ai} from '@cloudflare/ai';
import {log, loge, TelegramApi} from '#main';

// TODO Cloudflare timeout, maybe bug on their side
// review feature later
// this is not working for the moment
const TAG = 'cloudflareSDAiApi';
const AI_MODEL = '@cf/stabilityai/stable-diffusion-xl-base-1.0';
const AI_STEPS = 20
const CHAT_ACTION = 'upload_photo';

//TODO Disabled until cloudflare bundle module correctly
// and make gateway working
// and fix timeout problem
export default function call(metadata) {
	log(TAG, 'api request');
	if (!metadata.msg) {
		throw new Error(`user prompt is empty msg: ${metadata.msg}`)
	}
	const ai = new Ai(metadata.env.AI);
	//returns binary string
	const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
	return repo.sendChatAction({chat_id: metadata.chat_id, action: CHAT_ACTION})
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
			const blob = new Blob([resp], {type: 'image/png'});
			// suggested faster way to parse the image
			//const binaryData = Buffer.from(resp, 'binary');
			log(TAG, 'forwarding to telegram');
			return repo.sendPhoto({
				chat_id: metadata.chat_id, photo: blob,
				reply_to_message_id: metadata.message_id
			});
		}).then(resp => {
			log(TAG, 'api success', resp);
		})
		.catch(e => {
			throw new Error('api fail', { cause: e });
		});
}
