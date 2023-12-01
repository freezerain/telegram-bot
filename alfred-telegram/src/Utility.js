const isLogging = true;
const isLoggingError = true;

export const log = (msg, ...details) => {
  if(isLogging){
    const formattedDetails = details.map((param) => JSON.stringify(param));
    console.log(`${msg}. ${formattedDetails.join('. ')}`);
  }
}

export const loge = (msg, ...details) => {
  if(isLoggingError){
		const formattedDetails = details.map((param) => JSON.stringify(param));
    console.error(`${msg}. ${formattedDetails.join('. ')}`);
  }
}
