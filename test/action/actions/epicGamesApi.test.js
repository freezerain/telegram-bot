import { assert } from 'chai';
import sinon from 'sinon';
import EpicGamesApi from '#src/action/actions/epicGamesApi.js';
import { FetchApi, TelegramApi } from '#main';

describe('EpicGamesApi', () => {
	const CHAT_ACTION = 'typing';
	const TELEGRAM_CAPTION = '🤑 Сегодня бесплатно в епик сторе: ';
	const game1 = {
		title: 'Game 1',
		price: { totalPrice: { discountPrice: 0, originalPrice: 20, currencyCode: 'USD' } },
		keyImages: [{ type: 'Thumbnail', url: 'game1_thumbnail_url' }],
		id: 'game1_id',
		description: 'Description for Game 1',
		promotions: { promotionalOffers: ['it is indeed a free game'] },
		offerType: 'game_offer_type'
	};

	const game2 = {
		title: 'Game 2',
		price: { totalPrice: { discountPrice: 0, originalPrice: 25, currencyCode: 'USD' } },
		keyImages: [{ type: 'Thumbnail', url: 'game2_thumbnail_url' }],
		id: 'game2_id',
		description: 'Description for Game 2',
		promotions: { promotionalOffers: ['it is indeed a free game'] },
		offerType: 'game_offer_type'
	};

	const media = '[{"type":"photo","media":"game1_thumbnail_url","caption":"🤑 Сегодня бесплатно в епик сторе: \\n[Game 1](https://www.google.com/search?q=Game 1 epic games)\\n[Game 2](https://www.google.com/search?q=Game 2 epic games)","parse_mode":"MarkdownV2"},{"type":"photo","media":"game2_thumbnail_url"}]';

	const testScenarios = [
		{
			description: 'should call sendChatAction, fetchData, and send game using sendPhoto for one game',
			elements: [game1],
			expectedSendPhotoCalled: true,
			expectedSendMediaGroupCalled: false
		},
		{
			description: 'should call sendChatAction, fetchData, and send games using sendMediaGroup for multiple games',
			elements: [game1, game2],
			expectedSendPhotoCalled: false,
			expectedSendMediaGroupCalled: true
		}
	];

	const metadata = {
		env: {
			TELEGRAM_BOT_TOKEN: 'fake_token'
		},
		chat_id: 'fake_chat_id', message_id: 1
	};

	afterEach(sinon.restore);

	describe('Epic Games api', () => {
		testScenarios.forEach((scenario, index) => {
			it(scenario.description, async () => {

				const fakeSendPhoto = sinon.fake.resolves();
				const fakeSendMediaGroup = sinon.fake.resolves();
				const fakeSendChatAction = sinon.fake.resolves();
				const fakeFetchApi = sinon.fake.resolves({
						data: {
							Catalog: {
								searchStore: {
									paging: {
										total: 0
									},
									elements: scenario.elements
								}
							}
						}
					}
				);

				sinon.replace(TelegramApi.prototype, 'sendPhoto', fakeSendPhoto);
				sinon.replace(TelegramApi.prototype, 'sendMediaGroup', fakeSendMediaGroup);
				sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
				sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchApi);

				await new EpicGamesApi().call(metadata);

				sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
					chat_id: metadata.chat_id, action: CHAT_ACTION
				});

				sinon.assert.calledOnce(fakeFetchApi);

				if (scenario.expectedSendPhotoCalled) {
					sinon.assert.calledOnce(fakeSendPhoto);
					sinon.assert.calledOnceWithExactly(fakeSendPhoto, {
						chat_id: metadata.chat_id,
						photo: 'game1_thumbnail_url', // Adjust based on your actual data structure
						caption: TELEGRAM_CAPTION + '\n' + '[Game 1](https://www.google.com/search?q=Game 1 epic games)',
						reply_to_message_id: metadata.message_id,
						parse_mode: 'MarkdownV2'
					});
					sinon.assert.notCalled(fakeSendMediaGroup);
				} else if (scenario.expectedSendMediaGroupCalled) {
					sinon.assert.notCalled(fakeSendPhoto);
					sinon.assert.calledOnceWithExactly(fakeSendMediaGroup, {
						chat_id: metadata.chat_id,
						media: media, // Adjust based on your actual data structure
						reply_to_message_id: metadata.message_id
					});
				} else {
					assert.fail(`Unexpected scenario for test case ${index}`);
				}
			});
		});

		it('should throw an error and log "api fail" on failure', async () => {
			const fakeSendPhoto = sinon.fake.resolves();
			const fakeSendMediaGroup = sinon.fake.resolves();
			const fakeSendChatAction = sinon.fake.rejects();
			const fakeFetchApi = sinon.fake.resolves();

			sinon.replace(TelegramApi.prototype, 'sendPhoto', fakeSendPhoto);
			sinon.replace(TelegramApi.prototype, 'sendMediaGroup', fakeSendMediaGroup);
			sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
			sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchApi);

			await new EpicGamesApi().call(metadata).then(() => {
				assert.fail('Expected an error, but the call succeeded');
			}).catch(e => {
				assert.equal(e.message, 'api fail');
			});

			sinon.assert.notCalled(fakeSendPhoto);
			sinon.assert.notCalled(fakeSendMediaGroup);
			sinon.assert.notCalled(fakeFetchApi);
			sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
				chat_id: metadata.chat_id, action: CHAT_ACTION
			});
		});
	});
});
