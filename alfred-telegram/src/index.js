/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { log, loge, handleEventRequest } from './main.mjs'

const Env = {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "AI" with the variable name you defined.
  AI: null,
};

export default {
	async fetch(request, env, ctx) {
		log('Fetch request received', request)
		return await handleEventRequest(request, env)
	},
};

