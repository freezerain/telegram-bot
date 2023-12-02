import { log, loge } from './Utility.js'
import { sendMessageURL, sendPhotoURL } from './telegramApi.js'


const goodBoyApi = 'https://dog.ceo/api/breeds/image/random'
export async function send(chatId, env){
  log('Starting dogApi call')
  const payload = await fetch(goodBoyApi).then(resp => resp.json())
  log('Payload received', payload)
  if('message' in payload){
    log('Returning dog photo')
    await fetch(sendPhotoURL(chatId, payload.message, '🐶', false, env))
  }else{
    loge('Payload error')
    await fetch(sendMessageURL(chatId, 'No dogos, sry 😢', false, env))
  }
}
