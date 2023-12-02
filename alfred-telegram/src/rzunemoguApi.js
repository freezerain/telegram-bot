import { log, loge } from './Utility.js'
import { sendMessageURL } from './telegramApi.js'

const url = "http://rzhunemogu.ru/RandJSON.aspx?CType=11"

//TODO Stupid API not working
export async function send(chatId, env){
  log('Calling rzunemagu api')

  const jokePayload = await fetch(url).then( response=>{
  	log(response.text)
  	return response
  }).then(response => response.json())
  	.catch(e=> loge(e.message, e.stack))
  log('Payload received', jokePayload)


  if ('content' in jokePayload){
    log('Sending joke')
    const jokeMsg = jokePayload.content.match(/.{1,4096}/g)
    log('Joke broken to chunks', jokeMsg)
    for (const chunk of jokeMsg) {
        const url = sendMessageURL(chatId, chunk, false, env)
        await fetch(url).then(resp => resp.json())
    }
    return;
  }
  loge('content not found in payload')
}
