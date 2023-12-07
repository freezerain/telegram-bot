const IS_LOG_CONSOLE = true;
const IS_LOG_ERROR = true;
const MAX_LOGGING_LENGTH = 2048;

export const log = (msg, ...details) => {
	if (IS_LOG_CONSOLE) {
		const formattedDetails = details.map((param) => JSON.stringify(param)).filter(Boolean);
		const logMessage = (`${msg}. ${formattedDetails.join(' | ')}`).slice(0, MAX_LOGGING_LENGTH);
		console.log(logMessage);
	}
};

export const loge = (msg, ...details) => {
	if (IS_LOG_ERROR) {
		const formattedDetails = details.map((param) => JSON.stringify(param)).filter(Boolean);
		const logMessage = (`${msg}. ${formattedDetails.join(' | ')}`).slice(0, MAX_LOGGING_LENGTH);
		console.error(logMessage);
	}
};
