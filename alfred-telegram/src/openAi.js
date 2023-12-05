import OpenAI from 'openai';

//const { fetchAdapter } = require('@vespaiach/axios-fetch-adapter')
import { log, loge, chunkString } from './Utility.js'
import { sendMessageURL } from './telegramApi.js'

const systemRole = 'I only interested in distilled and fast answers. Do not add unnecessary information or use any formal language to soften interaction. Short answers are the best. Always answer in Russian language.'

//TODO add multiple roles
export async function prompt(msg, chatId, env){
		const words = msg.split(' ');
  	const userPrompt = words.length>1 ? words.slice(1).join(' ') : msg

  	const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY // This is also the default, can be omitted
    });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{"role": "system",
      						"content": systemRole
                 },
                 {"role": "user",
                  "content": userPrompt}],
    });

    const response = chatCompletion.choices[0].message.content;
    console.log(response)

    for (const chunk of chunkString(response)) {
        const url = sendMessageURL(chatId, chunk, false, env)
        await fetch(url).then(resp => resp.json())
    }

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
