import { log, loge } from '../main.mjs';

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
