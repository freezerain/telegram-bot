//const { Ai } = require('@cloudflare/ai')
import { Ai } from '@cloudflare/ai';
import { log, loge, chunkString, TelegramRepo } from '../../main.mjs'
//To update package
//	npm update @cloudflare/ai --save-dev
//available models:
//	@cf/mistral/mistral-7b-instruct-v0.1
//	@cf/meta/llama-2-7b-chat-int8
//	@cf/meta/llama-2-7b-chat-fp16
const aiRole = `
	Always use russian language.
	You are in the middle of the conversation.
	Give only distilled and fast answers.
	Do not add unnecessary information and do not use any formal language to soften interaction.
	Short answers are the best.
	Always answer in Russian language, and do not exceed token limit of 1500.
`

export default function call(metadata){
	log('cloudflareLLMAiApi call')
  if(!metadata.msg){
  	throw new Error('cloudflareLLMAiApi user prompt is empty', metadata?.msg)
  }
  const ai = new Ai(metadata.env.AI);
	const aiModel = '@cf/meta/llama-2-7b-chat-fp16'
  const repo = new TelegramRepo(metadata.env)
  return repo.sendChatAction(metadata.chat_id, 'typing')
  						.then( resp => {
  						return ai.run(aiModel, {
  						  messages: [
  						    { role: 'system', content: aiRole },
  						    { role: 'user', content: metadata.msg },
  						  ],
  						})
  						}).then(resp => {
  							log('cloudflareLLMAiApi response', resp)
  							const chunks = chunkString(resp.response)
  							chunks.unshift(`model: ${aiModel}`)
  							const telegramFetchChain = chunks.reduce((chain, chunk) => {
  						        												return chain.then(() => repo.sendMessage(metadata.chat_id, chunk));
  						      												}, Promise.resolve());
  						  return telegramFetchChain
  						}).then(resp=>{
  							log('cloudflareLLMAiApi success', resp)
  						}).catch(e => {
  							loge('cloudflareLLMAiApi error', e.message)
  							throw e
  						})
}

/*
// TODO Streaming not possible???
// Im not sure there are a solution but
// without streaming its useless
async function aiPromptStream(msg, chatId, env){
  const ai = new Ai(env.AI);
  const words = msg.split(' ');
  const userPrompt = words.length>1 ? words.slice(1).join(' ') : msg

  const response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', {
    stream: true,
    messages: [
      { role: 'system', content: aiRole },
      { role: 'user', content: userPrompt },
    ],
  });
  const source = new EventSource(response); // Use the streaming endpoint provided by AI
  let accumulatedMessage = '';

  source.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const responseChunk = data.response;
  	accumulatedMessage += responseChunk;
 		if (accumulatedMessage.length >= 3000 || data.done) {
     	fetch(sendMessageURL(chatId, accumulatedMessage, false, env)).then(resp => resp.json());
     	accumulatedMessage = '';
   }
    if (data.done) {
      source.close();
    }
  };
}

*/

