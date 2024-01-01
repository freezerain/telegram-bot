import sinon from 'sinon';
import { assert } from 'chai';
import GoodBoyApi from '#src/action/actions/goodBoyApi.js';
import { FetchApi, TelegramApi } from '#main';

describe('Good boy api', () => {
	const CHAT_ACTION = 'upload_photo';
	const GOOD_BOY_CAPTION = '🐶🐶🐶';

	const metadata = {
		env: {
			TELEGRAM_BOT_TOKEN: 0,
		},
		chat_id: 1,
		msg: 'good doggie',
		message_id: 3,
	};

	afterEach(sinon.restore);

	it('should call the api and forward to telegram', async () => {
		const fakeFetchData = sinon.fake.resolves({ message: 'photo url' });
		const fakeSendChatAction = sinon.fake.resolves();
		const fakeSendPhoto = sinon.fake.resolves('api success');
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);
		sinon.replace(TelegramApi.prototype, 'sendPhoto', fakeSendPhoto);
		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);

		assert.equal(await new GoodBoyApi().call(metadata), 'api success');

		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id, action: CHAT_ACTION
		});

		sinon.assert.calledOnceWithExactly(fakeSendPhoto, {
			chat_id: metadata.chat_id,
			photo: 'photo url',
			caption: GOOD_BOY_CAPTION,
			reply_to_message_id: metadata.message_id
		});

		sinon.assert.calledOnceWithExactly(fakeFetchData, 'breed/doggie/good/images/random');
	});

	it('should handle errors and throw the correct message', async () => {
		const fakeFetchData = sinon.fake.rejects();
		const fakeSendChatAction = sinon.fake.resolves();
		const fakeSendPhoto = sinon.fake.resolves('api success');
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);
		sinon.replace(TelegramApi.prototype, 'sendPhoto', fakeSendPhoto);
		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);

		await new GoodBoyApi().call(metadata).then(() => {
			assert.fail('should not be called');
		}).catch( e => {
			assert.equal(e.message, 'nooo! poor dogies');
		})

		sinon.assert.calledOnceWithExactly(fakeFetchData, 'breed/doggie/good/images/random');
		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id, action: CHAT_ACTION
		});
		sinon.assert.notCalled(fakeSendPhoto);
	});
});
