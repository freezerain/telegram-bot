

export const sendMessageURL = (chatId, text, notify, env) => {
	return `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}&disable_notification=${!notify}`
}





function createDivinityPoll(chatId){
  return `https://api.telegram.org/bot${API_KEY}/sendPoll?chat_id=${chatId}&question=${pollBodyText}&options=${JSON.stringify([postivePollOption, negativePollOption])}`
}
function sendPhotoURL(chatId, photo, caption){
  return `https://api.telegram.org/bot${API_KEY}/sendPhoto?chat_id=${chatId}&photo=${photo}&caption=${caption}&disable_notification=true`
}
function sendMediaGroup(chatId, media){
  return `https://api.telegram.org/bot${API_KEY}/sendMediaGroup?chat_id=${chatId}&media=${media}&disable_notification=true`
}
sendMediaGroup
function sendAnimationURL(chatId, animation){
  return `https://api.telegram.org/bot${API_KEY}/sendAnimation?chat_id=${chatId}&animation=${animation}&disable_notification=true`
}
