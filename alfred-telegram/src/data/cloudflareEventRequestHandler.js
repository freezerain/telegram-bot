import { log, loge, telegramEventRouter } from '../main.mjs';

const TAG = 'cloudflareEventRequestHandler';

export default async function handleRequest(request, env) {
	log(TAG, 'handling event request', request);
	try {
		if (request.method === 'POST') {
			log(TAG, 'forwarding request to handler');
			return request.json().then((json) => telegramEventRouter(json, env)).then(() => {
				return new Response('OK');
			});
		} else {
			loge(TAG, 'request method should be POST', request?.method);
			throw new Error(TAG + ' request should be POST, request: ' + request?.method);
		}
	} catch (error) {
		loge(TAG, 'catching exception', error.message);
		loge(TAG, 'exception call stack', error.stack);
		return new Response('Exception during handling request: ' + error.message);
	}
}