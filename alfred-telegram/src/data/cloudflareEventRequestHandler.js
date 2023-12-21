import {log, loge, telegramRouter, TelegramApi, buildError} from '../main.mjs';

const TAG = 'cloudflareEventRequestHandler';

export default async function handleRequest(request, env) {
	log(TAG, 'handling event request', request);

	if (request.method !== 'POST') {
		loge(TAG, 'request method should be POST', request?.method);
		return new Response('request method should be POST, method: ' + request?.method);
	}

	log(TAG, 'forwarding request to handler');

	return request.json()
		.then((json) => telegramRouter(json, env))
		.then(() => {
			return new Response('OK');
		})
		.catch(e => {
			loge(TAG, 'error handling event request', e.message, e.stack);
			// TODO Add custom exceptions
			//and filter them here
			return exceptionReport(e.message, env)
				.then(() => {
					return new Response('OK');
				}).catch((e)=>{
					loge(TAG, 'error reporting exception back to chat', e.message, e.stack);
					return new Response('OK')
				});
		});
}

// secret: DEV_CHAT_ID
function exceptionReport(msg, env) {
	const tgApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
	const chat_id = env.DEV_CHAT_ID;
	return tgApi.sendMessage({chat_id: chat_id, text: msg})
		.then(resp => loge(TAG, 'exception callback sent'))
		.catch(e => loge(TAG, 'error reporting exception back to chat'));
}
