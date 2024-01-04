import {log, loge, telegramRouter, TelegramApi} from '#main';

const TAG = 'cloudflareEventRequestHandler';
const IS_REPORTING_EXCEPTIONS = false
export default async function handleRequest(request, env) {
	log(TAG, 'handling event request', request);

	if (request.method !== 'POST') {
		loge(TAG, 'request method should be POST', request?.method);
		return new Response('request method should be POST, method: ' + request?.method);
	}

	log(TAG, 'forwarding request to router');

	return request.json()
		.then((json) => telegramRouter(json, env))
		.catch(e => {
			loge(TAG, 'error routing event request', e.message, e.stack);
			// TODO Add custom exceptions
			//and filter them here
			return exceptionReport(e.message, env);
		}).then(()=> new Response('OK'))
}

// secret: DEV_CHAT_ID
function exceptionReport(msg, env) {
	if(!IS_REPORTING_EXCEPTIONS) {
		return;
	}
	const tgApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
	const chat_id = env.DEV_CHAT_ID;
	return tgApi.sendMessage({chat_id: chat_id, text: msg})
		.then(resp => loge(TAG, 'exception callback sent'))
		.catch(e => loge(TAG, 'error reporting exception to dev chat'));
}
