import { log, loge } from './Utility.js'

export const sendMessageURL = (chatId, text, notify, env) => {
	const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}&disable_notification=${!notify}`
	// DONT LOG URL WITH TOKEN FOOL
	log('send message URL constructed. chatID, text, isNotify', chatId, text, notify)
	return url
}

export const sendPhotoURL = (chatId, photo, caption, notify, env) => {
	const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${chatId}&photo=${photo}&caption=${caption}&disable_notification=${!notify}`
	// DONT LOG URL WITH TOKEN FOOL
	log('send photo URL constructed. chatID, caption, isNotify', chatId, caption, notify)
	return url
}



function createDivinityPoll(chatId){
  return `https://api.telegram.org/bot${API_KEY}/sendPoll?chat_id=${chatId}&question=${pollBodyText}&options=${JSON.stringify([postivePollOption, negativePollOption])}`
}

function sendMediaGroup(chatId, media){
  return `https://api.telegram.org/bot${API_KEY}/sendMediaGroup?chat_id=${chatId}&media=${media}&disable_notification=true`
}
sendMediaGroup
function sendAnimationURL(chatId, animation){
  return `https://api.telegram.org/bot${API_KEY}/sendAnimation?chat_id=${chatId}&animation=${animation}&disable_notification=true`
}
