import OpenAI from 'openai';

import { log, loge, chunkString, TelegramRepo } from '../../main.mjs';

const systemRole = 'I only interested in distilled and fast answers. Do not add unnecessary information or use any formal language to soften interaction. Short answers are the best. Always answer in Russian language.';

//TODO add multiple roles
export default function call(metadata) {
	log('openAiApi call');
	if (!metadata.msg) {
		throw new Error('openAiApi user prompt is empty', metadata?.msg);
	}
	const openai = new OpenAI({
		apiKey: metadata.env.OPENAI_API_KEY
	});
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, 'typing')
		.then(resp => {
			return openai.chat.completions.create({
				model: 'gpt-3.5-turbo-1106',
				messages: [{
					'role': 'system',
					'content': systemRole
				},
					{
						'role': 'user',
						'content': metadata.msg
					}]
			});
		}).then(resp => {
			log('openAiApi response', resp);
			const chunks = chunkString(resp.choices[0].message.content);
			const responseData = `model: ${resp.model}\n -prompt_tokens: ${resp.usage.prompt_tokens}\n -completion_tokens: ${resp.usage.completion_tokens}\n -total_tokens: ${resp.usage.total_tokens}`;
			chunks.unshift(responseData);
			const telegramFetchChain = chunks.reduce((chain, chunk) => {
				return chain.then(() => repo.sendMessage(metadata.chat_id, chunk));
			}, Promise.resolve());
			return telegramFetchChain;
		}).then(resp => {
			log('openAiApi success', resp);
		}).catch(e => {
			loge('openAiApi error', e.message);
			throw e;
		});
}

//TODO Consider using function as like in tutorial
//https://developers.cloudflare.com/workers/tutorials/openai-function-calls-workers/
/*
    try {
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-1106",
        messages: [{role: "user", content: "What's happening in the NBA today?"}],
        functions: [
          {
            name: "read_website_content",
            description: "Read the content on a given website",
            parameters: {
            type: "object",
            properties: {
              url: {
              type: "string",
              description: "The URL to the website to read ",
              }
            },
            required: ["url"],
            },
          }
        ]
      });*/
