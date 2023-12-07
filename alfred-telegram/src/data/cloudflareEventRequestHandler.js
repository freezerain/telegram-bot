import { log, loge, telegramEventRouter, Api, TelegramRepo } from '../main.mjs';

const TAG = 'cloudflareEventRequestHandler';

export default async function handleRequest(request, env) {
	log(TAG, 'handling event request', request);

	if (request.method !== 'POST') {
		loge(TAG, 'request method should be POST', request?.method);
		return new Response('request method should be POST, method: ' + request?.method);
	}

	log(TAG, 'forwarding request to handler');

	return request.json().then((json) => telegramEventRouter(json, env)).then(() => {
		return new Response('OK');
	}).catch(e => {
		loge(TAG, 'exception in callback chain', e.message);
		return new Response(TAG+ ' exception in callback chain: '+ e.message)
	});
}

function exceptionReport(request, msg, env) {
	const repo = new TelegramRepo(env);
	const chat_id = request?.message?.chat?.id;
	return repo.sendMessage(chat_id, msg)
		.then(resp => loge(TAG, 'exception callback sended'))
		.catch(e => loge(TAG, 'error reporting exception back to chat'));
}