import { log, loge } from './Utility.js'
import * as keywords from './keywordList.js'
import {botGreetingMsg} from './botMessages.js'
import * as telegramApi from './telegramApi.js'
import { sendChuckNorrisJoke } from './chuckNorrisApi.js'
import { send as jokeApi } from './rzunemoguApi.js'
import { send as dogApi } from './dogApi.js'
import { aiPrompt, aiStableDiffusion } from './ai.js'
import {prompt as openAi} from './openAi.js'
const isSendFallbackMsg = false

export async function handleEventRequest(request, env) {
  log('Handling event request', request)
  try {
     if (request.method === 'POST') {
       log('extracting payload from request')
       const payload = await request.json()
       await processPayload(payload, env)
     }else{
       loge('Request method should be POST', request.method)
       return new Response('Request should be POST')
     }
  } catch (error) {
    loge('Error handling request', error.message);
    loge('Call stack:', error.stack);
    return new Response('Exception during handling request: ' + error)
  }
  // TODO Instead of always returns OK, use callbacks
	return new Response('OK')
}

async function processPayload(payload, env) {
	log('Processing payload', payload)
  switch (true) {
    case 'poll' in payload && payload.poll.total_voter_count === 4:
      await handlePollRequest(payload, env);
      break;
    case 'message' in payload:
      await handleMessageRequest(payload, env);
      break;
    default:
      loge('Request without POLL and MESSAGE in payload');
      return new Response('Request should contain POLL or MESSAGE in payload');
  }
}

async function handleMessageRequest(payload, env) {
  log('Handling message request', payload);
  const chatId = payload.message.chat.id;
  const words = payload.message.text.split(' ');
  var text = payload.message.text.trim().toLowerCase();
  //If first symbol is slash -> remove it
	text = (text.startsWith('@ratalfred_bot ')) ? text.substring(15) : text;
	text = (text.startsWith('@ratalfred_bot')) ? text.substring(14) : text;
	text = (text.charAt(0) === '/') ? text.substring(1) : text;
	const msg = text
	const action = await messageRoutineRouter(chatId, msg, env)
	if(action){
		log('action executing', action)
		await action()
	}
	else{
    loge('Routine not found!', msg);
	}

}

// TODO review all actions
//Add request to all AI LLM models
//Add request to AI LLM with context
//Add default AI request
async function messageRoutineRouter(chatId, msg, env){

	  log('Choosing routine with message', msg)

    const routines = {
      greetings: {
        keywords: keywords.greetingList,
        action: async () => await fetch(telegramApi.sendMessageURL(chatId, botGreetingMsg, false, env)),
      },
      ai: {
        keywords: keywords.aiList,
        action: async () => await aiPrompt(msg, chatId, env),
      },
      openAi: {
              keywords: keywords.openAi,
              action: async () => await openAi(msg, chatId, env),
            },
      aiStableDiffusion: {
        keywords: keywords.stableDiffusion,
        action: async () => await aiStableDiffusion(msg, chatId, env),
      },
      tiktok: {
        keywords: keywords.tiktokList,
        action: async () => await fetch(sendMessageURL(chatId, tiktokMsg, false)),
      },
      dogApi: {
        keywords: keywords.dogList,
        action: async () => await dogApi(chatId, env),
      },
      divinity: {
        keywords: keywords.divinityList,
        action: async () => await fetch(createDivinityPoll(chatId)),
      },
      giphy: {
        keywords: keywords.morningList,
        action: async () => await sendGiphyMsg(chatId),
      },
      epicGames: {
        keywords: keywords.epicGamesList,
        action: async () => await sendFreeEpicGamesList(chatId, true),
      },
      multiDog: {
        keywords: keywords.multiDogList,
        action: async () => await sendMultiDog(chatId),
      },
      chuckNorris: {
        keywords: keywords.chuckNorrisList,
        action: async () => await sendChuckNorrisJoke(chatId, env),
      },
      joke: {
        keywords: keywords.jokeList,
        action: async () => await jokeApi(chatId, env),
      },
      fallback: {
        condition: isSendFallbackMsg,
        action: async () => await sendMessageURL(chatId, fallbackMsg, false),
      },
    };

    // Check for matching routines
    for (const [routineKey, routine] of Object.entries(routines)) {
    	const words = msg.split(' ');
    	const firstWord = words.length > 0 ? words[0].toLowerCase() : '';
      if (routine.keywords.includes(firstWord) || routine.condition) {
        console.log('Starting routine', routineKey);
        return routine.action;
      }
    }

  	//If no routine is found, check for fallback message
    if (routines.fallback.condition) {
    	log('Sending fallback message')
      return routines.fallback.action;
    }

		return null;
}
