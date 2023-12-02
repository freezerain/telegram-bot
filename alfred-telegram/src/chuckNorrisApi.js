import { log, loge } from './Utility.js'
import { sendMessageURL } from './telegramApi.js'
const chuckApi = "https://api.chucknorris.io/jokes/random"

export async function sendChuckNorrisJoke(chatId, env){
  log('Calling Chuck Norris api')
  const payload = await fetch(chuckApi).then(response => response.json())
  log('Chuck payload received', payload)
  if ('value' in payload){
  	log('Sending joke')
    await fetch(sendMessageURL(chatId, payload.value, false, env))
    return;
  }
  loge('Joke not found in payload')
}
