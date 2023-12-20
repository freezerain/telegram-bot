import {log, loge, cloudflareEventRequestHandler} from './main.mjs';

const TAG = 'index.js';

const Env = {
	AI: null
};

export default {
	fetch: async (request, env, ctx) => {
		log(TAG, 'worker request received', request);
		return cloudflareEventRequestHandler(request, env);
	},
//https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/
	scheduled: async (event, env, ctx) => {
		ctx.waitUntil(doSomeTaskOnASchedule());
	},
};
