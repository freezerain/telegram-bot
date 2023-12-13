import {log, loge, Api, TelegramRepo} from '../../main.mjs';
const TAG = 'epicGamesApi';
const EPIC_GAMES_BASE_URL = 'https://store-site-backend-static.ak.epicgames.com';
const EPIC_GAMES_ENDPOINT = 'freeGamesPromotions';
const CHAT_ACTION = 'typing';
const MAX_TELEGRAM_GROUP_SIZE = 10;
const TELEGRAM_CAPTION = '🤑 Сегодня бесплатно в епик сторе: '

export default function call(metadata) {
	log(TAG, 'api build');
	const repo = new TelegramRepo(metadata.env);
	return repo.sendChatAction(metadata.chat_id, CHAT_ACTION).then(() => {
		log(TAG, 'api request');
		return new Api(EPIC_GAMES_BASE_URL).fetchData(EPIC_GAMES_ENDPOINT);
	})
		.then(resp => {
			log(TAG, `api response`, resp);
			return resp;
		})
		.then(resp => {
			return forwardToTelegram(buildGameArr(resp), repo, metadata);
		})
		.then(resp => {
			log(TAG, 'api success');
			return resp;
		})
		.catch(e => {
			loge(TAG, 'api error', e.message);
			throw e;
		});
}

function forwardToTelegram(gameArr, repo, metadata) {
	// Telegram can attach 10 images per message max
	// In cases where more than 10 free games found
	// split into batches
	log(TAG, 'forwarding to telegram');
	const batchSize = MAX_TELEGRAM_GROUP_SIZE;
	const promises = [];
	for (let i = 0; i < gameArr.length; i += batchSize) {
		const batch = gameArr.slice(i, i + batchSize);
		if (batch.length === 1) {
			//use 'MarkdownV2' parse_mode
			promises.push(repo.sendPhoto(metadata.chat_id, batch[0].thumbnail,
				TELEGRAM_CAPTION + batch[0].url));
		} else {
			const imgArr = [];
			const msgArr = [TELEGRAM_CAPTION,];
			for (let k = 0; k < batch.length; k++) {
				const photo = {
					type: 'photo',
					media: batch[k].thumbnail
				}
				imgArr.push(photo);
				msgArr.push(batch[k].url);
			}
			//For mediaGroup telegram showing first image caption as group caption
			if(imgArr[0]){
				imgArr[0].caption = msgArr.join('\n');
				//For text_url [text](url)
				imgArr[0].parse_mode = 'MarkdownV2';
			}
			promises.push(repo.sendMediaGroup(metadata.chat_id, JSON.stringify(imgArr)));
		}
	}
	return Promise.all(promises);
}

//This function should return link to a game
//until epic games API will return actual URL
//google search query will be used
function buildGoogleSearchURL(str) {
	return `[${str}](https://www.google.com/search?q=${str} epic games)`;
}

function buildGameArr(json) {
	log(TAG, 'building free epic games array',
		`games received: ${json.data.Catalog.searchStore.paging.total}`);
	const gamesArr = [];
	for (const item of json.data.Catalog.searchStore.elements) {
		//check if promotion is present AND its 100% free
		if (item.price.totalPrice.discountPrice !== 0 ||
		item.promotions.promotionalOffers.length === 0) {
			continue;
		}
		const game = {
			title: item.title,
			currentPrice: item.price.totalPrice.discountPrice,
			originalPrice: item.price.totalPrice.originalPrice,
			curency: item.price.totalPrice.currencyCode,
			thumbnail: (item.keyImages.find(i => i.type === 'Thumbnail') ?? item.keyImages[0]).url,
			url: buildGoogleSearchURL(item.title)
		}
		gamesArr.push(game);
	}
	log(TAG, `free epic games array built: ${gamesArr.length}`,
		`skipped: ${gamesArr.length - json.data.Catalog.searchStore.paging.total}`,
		`games: ${gamesArr}`);
	return gamesArr
}
