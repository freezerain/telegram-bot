//const { Ai } = require('@cloudflare/ai')
import { Ai } from '@cloudflare/ai';
import { log, loge, TelegramRepo } from '../../main.mjs'

//TODO Cloudflare timeout, maybe bug on their side
//review feature later
//this is not working for the moment
export default function call(metadata){
	log('cloudflareSDAiApi call')
  if(!metadata.msg){
  	throw new Error('cloudflareSDAiApi user prompt is empty', metadata?.msg)
  }
  const ai = new Ai(metadata.env.AI);
	const aiModel = '@cf/stabilityai/stable-diffusion-xl-base-1.0'
	//returns binary string
	const repo = new TelegramRepo(metadata.env)
  return repo.sendChatAction(metadata.chat_id, 'upload_photo')
  						.then(resp => {
  							log('cloudflareSDAiApi generation begins')
								return ai.run(aiModel, {
									prompt: metadata.msg,
									num_steps: 10
								})
							}).then(resp => {
								//log('cloudflareSDAiApi response', resp)
								const blob = new Blob([resp], { type: 'image/png' });
								log('cloudflareSDAiApi sending blob to telegramApi')
								return repo.sendPhoto(metadata.chat_id, blob)
							}).catch(e=>{
								loge('cloudflareSDAiApi error', e.message)
							})
	//const formData = new FormData();

  // Append the image data to the FormData object
  //const blob = new Blob([response], { type: 'image/png' });
  //formData.append('file', blob, 'filename.png');

/*  const caption = 'stable dif'
  const notify = true
  await fetch('https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${chatId}&caption=${caption}&disable_notification=${!notify}', {
    method: 'POST',
    body: formData,
    headers: {
      // Add any additional headers required by the second API
      // Note: 'Content-Type' is set automatically when using FormData
    },
  }).then(resp => resp.json()).catch(e=> loge('error fetching', e))*/


}
