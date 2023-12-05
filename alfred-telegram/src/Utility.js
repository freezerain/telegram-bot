const isLogging = true;
const isLoggingError = true;

export const log = (msg, ...details) => {
  if(isLogging){
    const formattedDetails = details.map((param) => JSON.stringify(param));
    console.log(`${msg}.${formattedDetails.length > 0 ? ` args: ${formattedDetails.join(' | ')}` : ''}`);
  }
}

export const loge = (msg, ...details) => {
  if(isLoggingError){
		const formattedDetails = details.map((param) => JSON.stringify(param));
    console.error(`${msg}.${formattedDetails.length > 0 ? ` args: ${formattedDetails.join(' | ')}` : ''}`);
  }
}

//Telegram maximum message length is 4096
export function chunkString(str, chunkSize = 3072){
	log('Chunking the string', str)
	const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  log('Chunking result', chunks)
	return chunks
}
