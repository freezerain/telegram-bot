const { Ai } = require('@cloudflare/ai')
import { log, loge } from './Utility.js'
import { sendMessageURL, sendPhotoURL } from './telegramApi.js'

//npm update @cloudflare/ai --save-dev
export async function aiPrompt(msg, chatId, env) {
  const ai = new Ai(env.AI);
  const aiPrefix = `
  	Always use russian language.
  	You are in the middle of the conversation.
  	Give only distilled and fast answers.
  	Do not add unnecessary information and do not use any formal language to soften interaction.
  	Short answers are the best.
  	Always answer in Russian language, and do not exceed token limit of 1500.
  `

	const words = msg.split(' ');
	const userPrompt = words.length>1 ? words.slice(1).join(' ') : msg
	const finalPrompt = aiPrefix + userPrompt
	//@cf/mistral/mistral-7b-instruct-v0.1
	//@cf/meta/llama-2-7b-chat-int8
	//@cf/meta/llama-2-7b-chat-fp16
/*  const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: finalPrompt,
  });*/
  const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', {
    //stream: true,
    messages: [
      { role: 'system', content: aiPrefix },
      { role: 'user', content: userPrompt },
    ],
  });
  //const source = new EventSource(response.url); // Use the streaming endpoint provided by AI
  //let accumulatedMessage = '';

//  source.onmessage = (event) => {
//    const data = JSON.parse(event.data);
//    const responseChunk = data.response;
//  	accumulatedMessage += responseChunk;
//	if (accumulatedMessage.length >= 3000 || data.done) {
//	    // Process the accumulated message
//	    const url = sendMessageURL(chatId, accumulatedMessage, false, env);
//	    fetch(url).then(resp => resp.json());
//
//	    // Reset the accumulated message for the next batch
//	    accumulatedMessage = '';
//	  }
//
//    // Check for end of stream
//    if (data.done) {
//      source.close();
//    }
//  };

		/*const ai2 = new Ai(env.AI);
    const translation = await ai2.run('@cf/meta/m2m100-1.2b', {
        text: response.response,
        source_lang: "english", // defaults to english
        target_lang: "russian"
      }
    );*/

  //const chunks = response.response.match(/.{1,4096}/g)

  const chunks = [];
    for (let i = 0; i < response.response.length; i += 3072) {
      chunks.push(response.response.slice(i, i + 3072));
    }
  log('Broken to chunks', chunks)
  for (const chunk of chunks) {
      const url = sendMessageURL(chatId, chunk, false, env)
      await fetch(url).then(resp => resp.json())
  }
  return;

  //await fetch(sendMessageURL(chatId, response.response, false, env))
  //await fetch(sendMessageURL(chatId, translation.translated_text, false, env))
}

export async function aiStableDiffusion(msg, chatId, env){
  const ai = new Ai(env.AI);

	//remove first word
	const words = msg.split(' ');
  const userPrompt = words.length>1 ? words.slice(1).join(' ') : msg

	const response = await ai.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", {
		prompt: userPrompt,
		num_steps: 1
	});

  const url = sendPhotoURL(chatId, response, userPrompt, false, env)
  await fetch(url).then(resp => resp.json())
}
