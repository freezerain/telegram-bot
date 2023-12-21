import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import chuckNorrisApi from '#src/action/actions/chuckNorrisApi.js';
import { FetchApi, TelegramApi } from '#main';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Chuck Norris API', () => {
	const metadata = {
		env: { TELEGRAM_BOT_TOKEN: 'your-token' },
		chat_id: 'your-chat-id',
		message_id: 'your-message-id'
	};

	afterEach(sinon.restore);

	it('should call FetchApi.fetchData and TelegramApi.sendMessage', async () => {

		const fakeFetchData = sinon.fake.resolves({ value: 'Chuck Norris joke' });
		const fakeSendMessage = sinon.fake.resolves({ /* sent telegram message returned */ });
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);

		await chuckNorrisApi(metadata);

		sinon.assert.calledOnceWithExactly(fakeFetchData, 'jokes/random');
		sinon.assert.calledOnceWithExactly(fakeSendMessage, {
			chat_id: 'your-chat-id',
			text: 'Chuck Norris joke',
			reply_to_message_id: 'your-message-id'
		});

	});

	it('should throw an error if FetchApi.fetchData rejects', async () => {
		const fakeFetchData = sinon.fake.rejects(new Error('Error'));
		const fakeSendMessage = sinon.fake.resolves({ /* sent telegram message returned */ });
		sinon.replace(FetchApi.prototype, 'fetchData', fakeFetchData);
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);

		await assert.isRejected(chuckNorrisApi(metadata), 'api fail');

		sinon.assert.calledOnceWithExactly(fakeFetchData, 'jokes/random');
		sinon.assert.notCalled(fakeSendMessage);
	});
});
