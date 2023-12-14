import { log, loge, telegramRouter, TelegramApi, buildError } from '../main.mjs';

const TAG = 'cloudflareEventRequestHandler';

export default async function handleRequest(request, env) {
	log(TAG, 'handling event request', request);

	if (request.method !== 'POST') {
		loge(TAG, 'request method should be POST', request?.method);
		return new Response('request method should be POST, method: ' + request?.method);
	}

	log(TAG, 'forwarding request to handler');

	return request.json().then((json) => telegramRouter(json, env))
		.then(() => {
		return new Response('OK');
	}).catch(e => {
		loge(TAG, 'error handling event request', e.message, e.stack);
		return new Response('OK');
		// TODO rethrow to chat here
	});
}
// TODO add dev chat ID secret
function exceptionReport(request, msg, env) {
	const tgApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
	const chat_id = request?.message?.chat?.id;
	return tgApi.sendMessage({chatId: chat_id, text:msg})
		.then(resp => loge(TAG, 'exception callback sended'))
		.catch(e => loge(TAG, 'error reporting exception back to chat'));
}
