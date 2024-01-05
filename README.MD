# Alfred - Telegram Butler Bot

This Free Telegram bot, powered by a Cloudflare Worker, is designed and automate tasks in group chat.
Originally was created to send automated polls asking friend group if they ready to gaming tonight.

![Demo GIF](../assets/anim1.webp)

![Demo GIF](../assets/anim2.webp)

![Demo GIF](../assets/anim3.webp)

![Demo GIF](../assets/anim4.webp)

## What Can This Bot Do and what APIs supported:

- **OpenAI API: Ask ChatGPT 3.5 / 4**: this requires openAI token
- **EpicGames API: Free Games Updates**: Get updates on free games from the Epic Games Store.
- **Giphy API: Random GIF**: can search for specific tag
- **DogCEO API: Random Dog Photo**
- **Poll Creation**
- **Dice Roll**

You can schedule these actions using Cloudflare's cron timer.
The bot also uses Cloudflare's D1 serverless SQL database for data storage.

## How to Set It Up

### 1. Telegram

Follow [Telegram Bot Tutorial](https://core.telegram.org/bots/tutorial) to:

1. Create a bot using `@BotFather` and save its token to secret `TELEGRAM_BOT_TOKEN`.

#### *Optional:*

- Using `@BotFather` disable group privacy to let the bot see all messages.
- Using `@BotFather` register keywords as commands for rendering in Telegram after "/".

### 2. Cloudflare Dashboard

1. Create a worker.
2. Set worker link as Telegram webhook.
	 `https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}`
4. Create new D1 database and `epicgames` table with `id` (primary key int), `chatid` (string), and `games` (string).
5. Create a new AI gateway for openAi.

#### *Optional:*

- Create new token and save it to GitHub secrets if you want to deploy using GitHub actions.

### 3. Your Code

1. In `src/res/config.js`, set `aiGateway` and `epicTableName` that you get from cloudflare dashboard.
2. In `wrangler.toml`, set worker `name`, D1 `database_name` and `database_id`.

#### *Optional:*

- **To schedule actions:** create desired cron timers in cloudflare dashboard, put them in `src/res/crons.js`,
	and link them to the routine in `src/action/scheduledMap.js`.
- **To use different keywords or language:** change keywords in `src/res/keywords.js`.
- **To add new APIs/Actions:**: Put new actions in `src/action/actions` and register them in `src/action/actionMap.js` or
	`src/action/scheduledMap.js` for cron routines.

### 4. Secrets

Store secrets in the GitHub repo for deployment through GitHub Actions.
They'll be pushed to the Cloudflare dashboard.
Alternatively, add secrets directly in the dashboard:

- `TELEGRAM_BOT_TOKEN`: To send data back in the Telegram chat.

#### *Optional:*

- `CLOUDFLARE_API_TOKEN`: For bot deployment from GitHub actions
- `GIPHY_API_KEY`: To search for GIFs.
- `OPENAI_API_KEY`: To chat with ChatGPT.

## Contribute

Feel free to use, change, and share this code as you like. No license attached.

## Heads Up

This project isn't officially associated with Cloudflare, Telegram, Epic Games, OpenAI, or Giphy.
It's a standalone project, created for learning and fun, and comes as it is.
