/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { log, loge } from './Utility.js'
import { handleEventRequest } from './fetchHandler.js'

export default {
	async fetch(request, env, ctx) {
		//return new Response('Hello World!');
		log('Fetch request received', request)
		return handleEventRequest(request, env)
	},
};

