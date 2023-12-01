import { log, loge } from './Utility.js'
import * as keywords from './keywordList.js'
import {botGreetingMsg} from './botMessages.js'
import * as telegramApi from './telegramApi.js'
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
    loge('Error handling request', error);
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
    case 'message' in payload:
      await handleMessageRequest(payload, env);
    default:
      loge('Request without POLL and MESSAGE in payload');
      return new Response('Request should contain POLL or MESSAGE in payload');
  }
}

async function handleMessageRequest(payload, env) {
  log('Handling message request', payload);
  const chatId = payload.message.chat.id;
  const text = payload.message.text.trim().toLowerCase();
  //If first symbol is slash -> remove it
	const msg = (text.charAt(0) === '/') ? text.substring(1) : text;
	log('Choosing routine with message', msg)

	// TODO review all actions
  // Create a map of triggers to routines
  const routines = {
    greetings: {
      keywords: keywords.greetingList,
      action: async () => await fetch(telegramApi.sendMessageURL(chatId, botGreetingMsg, false, env)),
    },
    tiktok: {
      keywords: keywords.tiktokList,
      action: async () => await fetch(sendMessageURL(chatId, tiktokMsg, false)),
    },
    dogo: {
      keywords: keywords.dogList,
      action: async () => await sendDogPhotoURL(chatId),
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
    fallback: {
      condition: isSendFallbackMsg,
      action: async () => await sendMessageURL(chatId, fallbackMsg, false),
    },
  };

  // Check for matching routines
  for (const [routineKey, routine] of Object.entries(routines)) {
    if (routine.keywords.includes(msg) || routine.condition) {
      console.log('Starting routine', routineKey);
      await routine.action();
      return;
    }
  }

  loge('Routine not found!', msg);

	//If no routine is found, check for fallback message
  if (routine.fallback.condition) {
  	log('Sending fallback message')
    await routine.fallback.action();
  }
}
