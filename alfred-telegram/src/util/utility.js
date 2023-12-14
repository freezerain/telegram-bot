import {log, loge} from '../main.mjs';

const TAG = 'utility';
const DEFAULT_CHUNK_SIZE = 3072;

//Telegram maximum message length is 4096
export function chunkString(str, chunkSize = DEFAULT_CHUNK_SIZE) {
	log(TAG, 'chunking the string with max length', chunkSize, str);
	const chunks = [];
	for (let i = 0; i < str.length; i += chunkSize) {
		chunks.push(str.slice(i, i + chunkSize));
	}
	log(TAG, 'chunking completed', chunks);
	return chunks;
}

export function parseTimePassed(time) {
	console.log(TAG, 'parsing time', time);

	if (time === 0) {
		return 0;
	}

	const seconds = Math.floor(time / 1000) % 60;
	const minutes = Math.floor(time / 1000 / 60) % 60;
	const hours = Math.floor(time / 1000 / 60 / 60) % 24;
	const days = Math.floor(time / 1000 / 60 / 60 / 24);

	const components = [];

	if (days > 0) {
		components.push(`${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`);
	}

	if (hours > 0) {
		components.push(`${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'}`);
	}

	if (minutes > 0) {
		components.push(`${minutes} ${minutes === 1 ? 'минута' : minutes < 5 ? 'минуты' : 'минут'}`);
	}


	// Don't need seconds
	if (seconds > 0) {
		//components.push(`${seconds} ${seconds === 1 ? 'секунда' : seconds < 5 ? 'секунды' : 'секунд'}`);
	}

	const result = components.join(' ');
	log(TAG, 'parse finished', result);
	return result;
}

export const buildError = (tag, e, msg = '') => {
	loge(tag, e.message, e.stack);
	return new Error(`> ${tag}${msg ? ' -> ' + msg : ''}: ${e.message}`);
}
