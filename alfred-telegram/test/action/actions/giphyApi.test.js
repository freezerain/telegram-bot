import { assert } from 'chai';
import sinon from 'sinon';
import GiphyApi from '#src/action/actions/giphyApi.js';
import { FetchApi, TelegramApi } from '#main';

describe('GiphyApi', () => {
	const TELEGRAM_CAPTION = '🐀';
	const CHAT_ACTION = 'upload_photo';

	const metadata = {
		msg: 'test-msg',
		env: {
			GIPHY_API_KEY: 'test-api-key',
			TELEGRAM_BOT_TOKEN: 'test-bot-token'
		},
		chat_id: 'test-chat-id',
		message_id: 'test-message-id'
	};

	afterEach(sinon.restore);

	it('should make a successful API call', async () => {
		const fakeSendChatAction = sinon.fake.resolves();
		const fakeFetchData = sinon.fake.resolves({ data: { images: { original: { url: 'test-url' } } } });
		const fakeSendAnimation = sinon.fake.resolves();

		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendAnimation', fakeSendAnimation);
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);

		await new GiphyApi().call(metadata);

		sinon.assert.calledOnceWithExactly(fakeFetchData,
			'random?api_key=test-api-key&tag=test-msg&rating=r');
		sinon.assert.calledOnceWithExactly(fakeSendChatAction,
			{
				chat_id: metadata.chat_id,
				action: CHAT_ACTION
			});
		sinon.assert.calledOnceWithExactly(fakeSendAnimation, {
			chat_id: metadata.chat_id,
			animation: 'test-url',
			caption: TELEGRAM_CAPTION + metadata.msg,
			reply_to_message_id: metadata.message_id
		});
	});

	it('should handle API call failure', async () => {
		const fakeSendChatAction = sinon.fake.rejects('api fail');
		const fakeFetchData = sinon.fake.resolves();
		const fakeSendAnimation = sinon.fake.resolves();

		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendAnimation', fakeSendAnimation);
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);

		await new GiphyApi()
			.call(metadata)
			.then(() => {
				assert.fail('Expected an error, but the call succeeded');
			}).catch(e => {
				assert.equal(e.message, 'api fail');
			});

		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id,
			action: CHAT_ACTION
		});
		sinon.assert.notCalled(fakeFetchData);
		sinon.assert.notCalled(fakeSendAnimation);
	});
});
