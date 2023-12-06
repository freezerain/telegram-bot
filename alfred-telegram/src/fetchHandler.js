import { log, loge, getAction } from './main.mjs'

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
  var text = payload.message.text.trim();
  //If first word is slash or botName -> remove it
	text = (text.toLowerCase().startsWith('@ratalfred_bot')) ? text.substring(14).trim() : text;
	text = (text.charAt(0) === '/') ? text.substring(1) : text;

  const words = payload.message.text.split(' ');
  if(words.length === 0){
    throw new Error('No keyword found!')
  }

	const metadata = {
		chat_id : payload.message.chat.id,
		keyword : words[0].toLowerCase(),
		msg : words.length > 1 ? words.slice(1).join(' ') : '',
		words : words,
		env : env,
	}

	log('metadata builded', metadata.chat_id, metadata.keyword,metadata.msg, metadata.words)

	const action = getAction(metadata.keyword)
	if(action){
		await action(metadata)
	}
	else{
    loge('Action not found!', metadata.keyword);
	}
}
