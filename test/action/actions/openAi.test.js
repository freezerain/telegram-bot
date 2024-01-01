import sinon from 'sinon';
import { assert } from 'chai';
import OpenAiChatApi from '#src/action/actions/openAiChatApi.js';
import { TelegramApi } from '#main';

describe('OpenAI ChatGPT test', () => {
	const CHAT_ACTION = 'typing';

	const metadata = {
		env: {
			TELEGRAM_BOT_TOKEN: 0,
			OPENAI_API_KEY: 1
		},
		chat_id: 2,
		msg: 3,
		message_id: 4
	};

	afterEach(sinon.restore);

	it('should throw on empty msg', async () => {
		await new OpenAiChatApi().call({}).then(() => {
			assert.fail('should not be called');
		}).catch(e => {
			assert.equal(e.message, 'user prompt is empty, msg: undefined');
		});
	});

	it('should call the api and forward to telegram', async () => {
		const fakeSendChatAction = sinon.fake.resolves();
		const fakeSendMessage = sinon.fake.resolves('sent');
		const fakeAiCall = sinon.fake.returns({
			choices: [{ message: { content: 'AI response' } }],
			model: 'gpt-3.5-turbo-1106',
			usage: {
				prompt_tokens: 10,
				completion_tokens: 20,
				total_tokens: 30
			}
		});

		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);
		sinon.replace(OpenAiChatApi.prototype, 'buildAiCall', fakeAiCall);

		const result = await new OpenAiChatApi({ aiRole: 'very smart ai' }).call(metadata);
		assert.equal(result, 'sent');


		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id,
			action: CHAT_ACTION
		});

		sinon.assert.calledTwice(fakeSendMessage);

		sinon.assert.calledWithExactly(fakeSendMessage.getCall(0), {
			chat_id: metadata.chat_id,
			text: 'model: gpt-3.5-turbo-1106\n -prompt_tokens: 10\n -completion_tokens: 20\n -total_tokens: 30',
			reply_to_message_id: metadata.message_id
		});

		sinon.assert.calledWithExactly(fakeSendMessage.getCall(1), {
			chat_id: metadata.chat_id,
			text: 'AI response',
			reply_to_message_id: metadata.message_id
		});

		sinon.assert.calledOnceWithExactly(fakeAiCall, metadata);
	});

	it('should handle errors and throw the correct message', async () => {
		const fakeSendChatAction = sinon.fake.rejects();
		const fakeSendMessage = sinon.fake.resolves();
		const fakeAiCall = sinon.fake.returns();

		sinon.replace(TelegramApi.prototype, 'sendChatAction', fakeSendChatAction);
		sinon.replace(TelegramApi.prototype, 'sendMessage', fakeSendMessage);
		sinon.replace(OpenAiChatApi.prototype, 'buildAiCall', fakeAiCall);

		await new OpenAiChatApi({ aiRole: 'very smart ai' })
			.call(metadata)
			.then(() => {
				assert.fail('should not be called');
			}).catch(e => {
				assert.equal(e.message, 'api fail');
			});

		sinon.assert.calledOnceWithExactly(fakeSendChatAction, {
			chat_id: metadata.chat_id,
			action: CHAT_ACTION
		});
		sinon.assert.notCalled(fakeSendMessage);
		sinon.assert.notCalled(fakeAiCall);
	});
});
