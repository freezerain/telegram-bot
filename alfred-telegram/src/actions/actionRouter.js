import { log, loge } from '../main.mjs'
import actionMap, { fallbackAction } from './actionMap.js'

const isSendFallbackMsg = false

export default function getAction(keyword){
	for (const [key, val] of Object.entries(actionMap)) {
	  if (val.keywords.includes(keyword)) {
	  	log('Action found by keyword', keyword, val.action)
	    return val.action;
	  }
	}

	if (isSendFallbackMsg) {
		log('Action not found, sending fallback message', keyword)
	  return fallbackAction;
	}

	return null;
}
