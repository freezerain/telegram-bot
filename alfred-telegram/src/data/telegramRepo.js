import { log, loge, Api, TelegramApi } from '../main.mjs'


export default class TelegramRepo {
  constructor(env) {
  	this.api = new Api(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`)
    this.telegramApi = new TelegramApi(this.api)
  }

  sendMessage(chat_id, text) {
    return this.telegramApi.sendMessage(chat_id, text)
  }

  sendPhoto(chat_id, image, caption=null){
  	return this.telegramApi.sendPhoto(chat_id, image, caption)
  }

  sendDocument(chat_id, document, caption=null){
  	return this.telegramApi.sendDocument(chat_id, document, caption)
  }

  sendAnimation(chat_id, animation, caption=null){
  	return this.telegramApi.sendAnimation(chat_id, animation, caption)
  }

  sendMediaGroup(chat_id, media){
  	return this.telegramApi.sendMediaGroup(chat_id, media)
  }

  sendPoll(chat_id, question, options, is_anonymous=null, type=null,
  					allows_multiple_answers=null, correct_option_id=null){
  	return this.telegramApi.sendPoll(chat_id, question, options, is_anonymous, type,
  																		allows_multiple_answers, correct_option_id)
  }

  sendDice(chat_id, emoji=null){
  	return this.telegramApi.sendDice(chat_id, emoji)
  }

  sendChatAction(chat_id, action='typing'){
  	return this.telegramApi.sendChatAction(chat_id, action)
  }
}

