import { log, loge } from '../main.mjs'

const DEFAULT_CHUNK_SIZE = 3072
//Telegram maximum message length is 4096
export function chunkString(str, chunkSize = DEFAULT_CHUNK_SIZE){
	log('Chunking the string with max length', chunkSize, str)
	const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  log('Chunking result', chunks)
	return chunks
}
