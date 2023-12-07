const IS_LOG_CONSOLE = true;
const IS_LOG_ERROR = true;
const MAX_LOGGING_LENGTH = 2048;

export function log(tag, msg, ...details) {
	logging(tag, msg, false, ...details);
}

export function loge(tag, msg, ...details) {
	logging(tag, msg, true, ...details);
}

function logging(tag, msg, isError = false, ...details) {
	if (!((isError && IS_LOG_ERROR) || (!isError && IS_LOG_CONSOLE))) return;
	const formattedDetails = details.map((param) => JSON.stringify(param)).filter(Boolean).join(' | ');
	const str = `tag: ${tag}. msg: ${msg}. ${formattedDetails}`.slice(0, MAX_LOGGING_LENGTH);
	const logger = isError ? console.error : console.log;
	logger(str);
}