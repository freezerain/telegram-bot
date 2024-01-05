import { log, FetchApi, TelegramApi, DBRepo } from '#main';
import {strings} from '#res'

const TAG = 'epicGamesApi';
const EPIC_GAMES_BASE_URL = 'https://store-site-backend-static.ak.epicgames.com';
const EPIC_GAMES_ENDPOINT = 'freeGamesPromotions';
const CHAT_ACTION = 'typing';
const MAX_TELEGRAM_GROUP_SIZE = 10;
const TELEGRAM_CAPTION = strings.epicGamesMsg

export default class EpicGamesApi {

	constructor() {
	}

	call(metadata) {
		log(TAG, 'api build');
		const repo = new TelegramApi(metadata.env.TELEGRAM_BOT_TOKEN);
		return repo.sendChatAction({ chat_id: metadata.chat_id, action: CHAT_ACTION })
			.then(() => {
				log(TAG, 'api request');
				return new FetchApi(EPIC_GAMES_BASE_URL).fetchData(EPIC_GAMES_ENDPOINT);
			})
			.then(resp => {
				log(TAG, `api response`);
				return resp;
			})
			.then(resp => {
				const games = this.buildGameArr(resp);
				const dbRepo = new DBRepo(metadata.env.DB);
				log(TAG, 'start fetching db');
				return dbRepo.getLastGames(metadata.chat_id)
					.then(lastGames => {
						log(TAG, 'last games', lastGames);
						if (!lastGames || lastGames.length === 0) {
							return games;
						}
						const newGames = games.filter(game => !lastGames.some(lastGame => lastGame.id === game.id));
						log(TAG, 'new games', newGames);
						return newGames;
					}).then(newGames => {
						log(TAG, 'updating DB with new games');
						return dbRepo.addLastGames(metadata.chat_id, newGames)
							.then(() => {
								return newGames;
							});
					}).catch(e => {
						throw new Error('db fail', { cause: e });
					});
			})
			.then(games => {
				return this.forwardToTelegram(games, repo, metadata);
			})
			.then(resp => {
				log(TAG, 'api success');
				return resp;
			})
			.catch(e => {
				throw new Error('api fail', { cause: e });
			});
	}

	forwardToTelegram(gameArr, repo, metadata) {
		// Telegram can attach 10 images per message max
		// In cases where more than 10 free games found
		// split into batches
		log(TAG, 'forwarding to telegram');
		log(TAG, 'gameArr', gameArr);
		const batchSize = MAX_TELEGRAM_GROUP_SIZE;
		const promises = [];
		for (let i = 0; i < gameArr.length; i += batchSize) {
			const batch = gameArr.slice(i, i + batchSize);
			if (batch.length === 1) {
				//use 'MarkdownV2' parse_mode
				promises.push(repo.sendPhoto({
					chat_id: metadata.chat_id,
					photo: batch[0].thumbnail,
					caption: TELEGRAM_CAPTION + '\n' + batch[0].url,
					reply_to_message_id: metadata.message_id,
					parse_mode: 'MarkdownV2'
				}));
			} else {
				const imgArr = [];
				const msgArr = [TELEGRAM_CAPTION];
				for (let k = 0; k < batch.length; k++) {
					const photo = {
						type: 'photo',
						media: batch[k].thumbnail
					};
					imgArr.push(photo);
					msgArr.push(batch[k].url);
				}
				//For mediaGroup telegram showing first image caption as group caption
				if (imgArr[0]) {
					imgArr[0].caption = msgArr.join('\n');
					//For text_url [text](url)
					imgArr[0].parse_mode = 'MarkdownV2';
				}
				promises.push(repo.sendMediaGroup({
					chat_id: metadata.chat_id,
					media: JSON.stringify(imgArr), reply_to_message_id: metadata.message_id
				}));
			}
		}
		return Promise.all(promises);
	}

//This function should return link to a game
//until epic games API will return actual URL
//google search query will be used
	buildGoogleSearchURL(str) {
		return `[${str}](https://www.google.com/search?q=${str} epic games)`;
	}

	buildGameArr(json) {
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
				thumbnail: (item.keyImages.find(i => i.type === 'Thumbnail') ?? item.keyImages[0]).url,
				id: item.id,
				url: this.buildGoogleSearchURL(item.title)
			};
			gamesArr.push(game);
		}
		log(TAG, `free epic games array built: ${gamesArr.length}`,
			`skipped: ${json.data.Catalog.searchStore.paging.total - gamesArr.length}`,
			`games: `, gamesArr);
		return gamesArr;
	}
}
