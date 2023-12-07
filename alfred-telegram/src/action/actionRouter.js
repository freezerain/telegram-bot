import { log, loge } from '../main.mjs';
import actionMap, { fallbackAction } from './actionMap.js';

const TAG = 'actionRouter';
const IS_SEND_FALLBACK = false;

export default function getAction(keyword) {
	for (const [key, val] of Object.entries(actionMap)) {
		if (val.keywords.includes(keyword)) {
			log(TAG, 'Action found by keyword', keyword, key, val.action);
			return val.action;
		}
	}

	if (IS_SEND_FALLBACK) {
		loge(TAG, 'Action not found, sending fallback message', keyword);
		return fallbackAction;
	}

	return null;
}